import { create } from "zustand";
import { FICHA_TECNICA_INICIAL } from "@/data/fichaTecnicaDefaults";
import { NOMINA_ROWS } from "@/data/nominaSeed";
import type {
  EmpleadoNomina,
  FichaTecnica,
  MateriaPrima,
  MaterialEmpaque,
  ParametrosNomina,
  RecursoIntangible,
  RecursoTangible,
  Tab,
} from "@/types";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

interface State {
  activeTab: Tab;
  nombreProducto: string;
  masaTotal: number; // total de producción (ej: 200 unidades/porciones)
  unidadMasa: string;
  fichaTecnica: FichaTecnica;

  materias: MateriaPrima[];
  empaques: MaterialEmpaque[];
  recursosTangibles: RecursoTangible[];
  recursosIntangibles: RecursoIntangible[];
  parametrosNomina: ParametrosNomina;
  empleadosNomina: EmpleadoNomina[];

  // Densidades auxiliares (de la imagen)
  densidadLeche: number;
  densidadCrema: number;

  setTab: (t: Tab) => void;
  setField: (key: string, value: unknown) => void;
  addMateria: () => void;
  updateMateria: (id: string, key: keyof MateriaPrima, value: string | number) => void;
  removeMateria: (id: string) => void;
  addEmpaque: () => void;
  updateEmpaque: (id: string, key: keyof MaterialEmpaque, value: string | number) => void;
  removeEmpaque: (id: string) => void;

  addRecursoTangible: (categoria: RecursoTangible["categoria"]) => void;
  updateRecursoTangible: (id: string, key: keyof RecursoTangible, value: string | number) => void;
  removeRecursoTangible: (id: string) => void;

  addRecursoIntangible: (categoria: RecursoIntangible["categoria"]) => void;
  updateRecursoIntangible: (id: string, key: keyof RecursoIntangible, value: string | number) => void;
  removeRecursoIntangible: (id: string) => void;

  setParametrosNomina: (p: Partial<ParametrosNomina>) => void;
  addEmpleadoNomina: () => void;
  updateEmpleadoNomina: (id: string, key: keyof EmpleadoNomina, value: string | number | boolean) => void;
  removeEmpleadoNomina: (id: string) => void;

  updateFichaTecnica: (key: keyof FichaTecnica, value: string) => void;
}

export const useStore = create<State>((set) => ({
  activeTab: "ficha",
  nombreProducto: FICHA_TECNICA_INICIAL.producto,
  masaTotal: 200,
  unidadMasa: "unidades",
  fichaTecnica: { ...FICHA_TECNICA_INICIAL },

  densidadLeche: 1.03,
  densidadCrema: 1.022,

  materias: [
    { id: uid(), nombre: "Leche entera",            unidad: "Litros",     cantidadRequerida: 80,  descripcionCosto: "$500 X Litro",    costoUnitario: 500 },
    { id: uid(), nombre: "Leche en polvo entera",   unidad: "Kilogramos", cantidadRequerida: 40,  descripcionCosto: "Costo por kg",    costoUnitario: 26 },
    { id: uid(), nombre: "Crema de leche",          unidad: "Kilogramos", cantidadRequerida: 30,  descripcionCosto: "Costo por kg",    costoUnitario: 200 },
    { id: uid(), nombre: "Grasa vegetal o animal",  unidad: "Kilogramos", cantidadRequerida: 5,   descripcionCosto: "Costo por 25 kg", costoUnitario: 8.75 },
    { id: uid(), nombre: "Suero",                   unidad: "Kilogramos", cantidadRequerida: 5,   descripcionCosto: "Costo por kg",    costoUnitario: 125 },
    { id: uid(), nombre: "Azúcar",                  unidad: "Kilogramos", cantidadRequerida: 10,  descripcionCosto: "Costo por kg",    costoUnitario: 12 },
    { id: uid(), nombre: "Dextrosa",                unidad: "Kilogramos", cantidadRequerida: 5,   descripcionCosto: "Costo por kg",    costoUnitario: 35 },
    { id: uid(), nombre: "Estabilizantes",          unidad: "Kilogramos", cantidadRequerida: 3,   descripcionCosto: "Costo por kg",    costoUnitario: 12 },
    { id: uid(), nombre: "Emulsificantes",          unidad: "Kilogramos", cantidadRequerida: 2,   descripcionCosto: "Costo por kg",    costoUnitario: 4 },
    { id: uid(), nombre: "Esencias",                unidad: "ml",         cantidadRequerida: 5,   descripcionCosto: "Costo por 500 ml", costoUnitario: 150 },
    { id: uid(), nombre: "Crema de ron Medellín 8 años", unidad: "Litros", cantidadRequerida: 15, descripcionCosto: "Costo por 0.75 L", costoUnitario: 1027.40 },
  ],

  empaques: [
    { id: uid(), nombre: "Fibra de caña (biodegradable)", unidad: "Unidad", cantidadRequerida: 1, precioGeneral: 100000, descripcionCosto: "100 por caja", costoUnitario: 1000 },
    { id: uid(), nombre: "Cucharas de bioplástico",       unidad: "Unidad", cantidadRequerida: 1, precioGeneral: 23000,  descripcionCosto: "100 por caja", costoUnitario: 230 },
    { id: uid(), nombre: "Cajas de cartón corrugado",     unidad: "Unidad", cantidadRequerida: 1, precioGeneral: 8000,   descripcionCosto: "25 cajas por precio", costoUnitario: 320 },
  ],

  // Ficha técnica — hoja «Costos de recursos tangibles»
  recursosTangibles: [
    { id: uid(), categoria: "maquinaria", nombre: "Máquinas de helado", costo: 8_000_000 },
    { id: uid(), categoria: "maquinaria", nombre: "Batidora industrial", costo: 3_000_000 },
    { id: uid(), categoria: "maquinaria", nombre: "Pasteurizador", costo: 10_000_000 },
    { id: uid(), categoria: "equipos", nombre: "Congeladores y cámaras de refrigeración", costo: 5_000_000 },
    { id: uid(), categoria: "equipos", nombre: "Moldes y recipientes para helado", costo: 1_500_000 },
    { id: uid(), categoria: "equipos", nombre: "Dosificadores para la crema de ron", costo: 2_000_000 },
    { id: uid(), categoria: "herramientas", nombre: "Espátulas, cucharas y palas de helado", costo: 300_000 },
    { id: uid(), categoria: "herramientas", nombre: "Termómetros de cocina", costo: 200_000 },
    { id: uid(), categoria: "herramientas", nombre: "Báscula para gramaje de materiales", costo: 120_000 },
    { id: uid(), categoria: "herramientas", nombre: "Cuchillos y utensilios de repostería", costo: 150_000 },
    { id: uid(), categoria: "infraestructura", nombre: "Cocina con buena ventilación", costo: 5_000_000 },
    { id: uid(), categoria: "infraestructura", nombre: "Área de almacenamiento en frío", costo: 7_000_000 },
    { id: uid(), categoria: "infraestructura", nombre: "Espacio para empaque y etiquetado", costo: 4_000_000 },
    { id: uid(), categoria: "infraestructura", nombre: "Sistema de higiene y control", costo: 3_000_000 },
  ],

  // Ficha técnica — hoja «Costos de recursos intangibles»
  recursosIntangibles: [
    {
      id: uid(),
      categoria: "softwares",
      nombre: "Software de la empresa (información del producto hasta el cliente)",
      costo: 2_000_000,
    },
    { id: uid(), categoria: "conocimiento_tecnico", nombre: "Desarrollo de la receta", costo: 700_000 },
    { id: uid(), categoria: "conocimiento_tecnico", nombre: "Ajuste de sabor de la crema de ron", costo: 1_200_000 },
    { id: uid(), categoria: "conocimiento_tecnico", nombre: "Técnica para elaborar helados artesanales", costo: 700_000 },
    { id: uid(), categoria: "conocimiento_tecnico", nombre: "Control de cremosidad y textura", costo: 600_000 },
    { id: uid(), categoria: "licencias_permisos", nombre: "Registro sanitario para la producción y venta", costo: 1_500_000 },
    { id: uid(), categoria: "licencias_permisos", nombre: "Cumplimiento de normas sanitarias para alimentos", costo: 1_300_000 },
    { id: uid(), categoria: "licencias_permisos", nombre: "Licencias para incorporación de alcohol en alimentos", costo: 2_000_000 },
    { id: uid(), categoria: "licencias_permisos", nombre: "Licencias de control de maquinaria y calidad", costo: 4_000_000 },
    { id: uid(), categoria: "licencias_permisos", nombre: "Registro de marca", costo: 1_200_000 },
    { id: uid(), categoria: "procesos_metodos", nombre: "Métodos de pasteurización y conservación", costo: 3_000_000 },
    { id: uid(), categoria: "procesos_metodos", nombre: "Proceso estandarizado de batido y congelación", costo: 3_000_000 },
    { id: uid(), categoria: "procesos_metodos", nombre: "Sistema de empaque y conservación en frío", costo: 5_000_000 },
  ],

  parametrosNomina: {
    salarioMinimoLegal: 1_750_905,
    auxilioTransporte: 249_095,
    porcentajeSalud: 0.04,
    porcentajePension: 0.04,
  },
  empleadosNomina: NOMINA_ROWS.map((r) => ({ ...r, id: uid() })),

  setTab: (t) => set({ activeTab: t }),
  setField: (key, value) => set((s) => ({ ...s, [key]: value })),

  addMateria: () => set((s) => ({
    materias: [...s.materias, { id: uid(), nombre: "", unidad: "Kilogramos", cantidadRequerida: 0, descripcionCosto: "", costoUnitario: 0 }],
  })),
  updateMateria: (id, key, value) => set((s) => ({
    materias: s.materias.map((m) => m.id === id ? { ...m, [key]: value } : m),
  })),
  removeMateria: (id) => set((s) => ({ materias: s.materias.filter((m) => m.id !== id) })),

  addEmpaque: () => set((s) => ({
    empaques: [...s.empaques, { id: uid(), nombre: "", unidad: "Unidad", cantidadRequerida: 1, precioGeneral: 0, descripcionCosto: "", costoUnitario: 0 }],
  })),
  updateEmpaque: (id, key, value) => set((s) => ({
    empaques: s.empaques.map((e) => e.id === id ? { ...e, [key]: value } : e),
  })),
  removeEmpaque: (id) => set((s) => ({ empaques: s.empaques.filter((e) => e.id !== id) })),

  addRecursoTangible: (categoria) => set((s) => ({
    recursosTangibles: [
      ...s.recursosTangibles,
      { id: uid(), nombre: "", costo: 0, categoria },
    ],
  })),
  updateRecursoTangible: (id, key, value) => set((s) => ({
    recursosTangibles: s.recursosTangibles.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
  })),
  removeRecursoTangible: (id) => set((s) => ({
    recursosTangibles: s.recursosTangibles.filter((r) => r.id !== id),
  })),

  addRecursoIntangible: (categoria) => set((s) => ({
    recursosIntangibles: [
      ...s.recursosIntangibles,
      { id: uid(), nombre: "", costo: 0, categoria },
    ],
  })),
  updateRecursoIntangible: (id, key, value) => set((s) => ({
    recursosIntangibles: s.recursosIntangibles.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
  })),
  removeRecursoIntangible: (id) => set((s) => ({
    recursosIntangibles: s.recursosIntangibles.filter((r) => r.id !== id),
  })),

  setParametrosNomina: (p) => set((s) => ({
    parametrosNomina: { ...s.parametrosNomina, ...p },
  })),

  addEmpleadoNomina: () => set((s) => ({
    empleadosNomina: [
      ...s.empleadosNomina,
      {
        id: uid(),
        rol: "",
        salarioBasico: s.parametrosNomina.salarioMinimoLegal,
        diasLiquidados: 30,
        salarioDevengado: s.parametrosNomina.salarioMinimoLegal,
        horasExtras: 0,
        recargosNocturnos: 0,
        domFestivo: 0,
        auxilioTransporteAuto: true,
        auxilioTransporteManual: 0,
        fondoSolidaridad: 0,
        retencionFuente: 0,
        otrasDeducciones: 0,
      },
    ],
  })),
  updateEmpleadoNomina: (id, key, value) => set((s) => ({
    empleadosNomina: s.empleadosNomina.map((e) =>
      e.id === id ? { ...e, [key]: value } : e,
    ),
  })),
  removeEmpleadoNomina: (id) => set((s) => ({
    empleadosNomina: s.empleadosNomina.filter((e) => e.id !== id),
  })),

  updateFichaTecnica: (key, value) =>
    set((s) => ({
      fichaTecnica: { ...s.fichaTecnica, [key]: value },
      ...(key === "producto" ? { nombreProducto: value } : {}),
    })),
}));
