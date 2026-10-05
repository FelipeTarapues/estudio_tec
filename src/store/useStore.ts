import { create } from "zustand";
import type {
  EmpleadoNomina,
  FichaTecnica,
  MateriaPrima,
  MaterialEmpaque,
  ParametrosNomina,
  ProyeccionData,
  RecursoIntangible,
  RecursoTangible,
  Tab,
} from "@/types";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const emptyFicha: FichaTecnica = {
  producto: "",
  fabricante: "",
  modelo: "",
  marca: "",
  presentacion: "",
  descripcionProducto: "",
  especificacionesTecnicas: "",
  instruccionesUso: "",
  beneficios: "",
  advertencias: "",
  composicion: "",
  empaque: "",
  rotulado: "",
  lugarElaboracion: "",
  fechaElaboracion: "",
  unidadVenta: "",
};

const emptyProyecciones: ProyeccionData = {
  anos: [],
  estudiantes: [],
  inversiones: [],
  capitalTrabajo: [],
  demanda: [],
  materiasPrimas: [],
  costos: [],
  cif: [],
  gastosAdmin: [],
  resultados: [],
  flujoCaja: [],
  indicadores: null,
};

interface State {
  activeTab: Tab;
  loading: boolean;
  isLoaded: boolean;
  error: string | null;
  nombreProducto: string;
  masaTotal: number;
  unidadMasa: string;
  fichaTecnica: FichaTecnica;

  materias: MateriaPrima[];
  empaques: MaterialEmpaque[];
  recursosTangibles: RecursoTangible[];
  recursosIntangibles: RecursoIntangible[];
  parametrosNomina: ParametrosNomina;
  empleadosNomina: EmpleadoNomina[];

  densidadLeche: number;
  densidadCrema: number;
  proyecciones: ProyeccionData;

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
  loadFromApi: (force?: boolean) => Promise<void>;
}

const apiBase = process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";
const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
let loadFromApiPromise: Promise<void> | null = null;

export const useStore = create<State>((set, get) => ({
  activeTab: "ficha",
  loading: true,
  isLoaded: false,
  error: null,
  nombreProducto: "",
  masaTotal: 0,
  unidadMasa: "unidades",
  fichaTecnica: { ...emptyFicha },

  densidadLeche: 0,
  densidadCrema: 0,

  materias: [],
  empaques: [],
  recursosTangibles: [],
  recursosIntangibles: [],

  parametrosNomina: {
    salarioMinimoLegal: 0,
    auxilioTransporte: 0,
    porcentajeSalud: 0,
    porcentajePension: 0,
  },
  empleadosNomina: [],
  proyecciones: { ...emptyProyecciones },

  loadFromApi: (force = false) => {
    if (!force && get().isLoaded) return Promise.resolve();
    if (loadFromApiPromise) return loadFromApiPromise;

    loadFromApiPromise = (async () => {
      if (!publishableKey) {
        set({ loading: false, isLoaded: false, error: "Falta NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY — los datos deben venir del backend." });
        return;
      }
      try {
        set({ loading: true, error: null });
        const response = await fetch(`${apiBase}/store/estudio-tecnico`, {
          headers: { "x-publishable-api-key": publishableKey },
        });
        if (!response.ok) throw new Error(`API respondió ${response.status}`);
        const { data } = await response.json();
        if (!data?.proyecto) throw new Error("Respuesta del backend sin proyecto");
        set({
          loading: false,
          isLoaded: true,
          error: null,
          nombreProducto: data.proyecto.nombreProducto ?? "",
          masaTotal: Number(data.proyecto.masaTotal ?? 0),
          unidadMasa: data.proyecto.unidadMasa ?? "unidades",
          fichaTecnica: data.ficha ?? { ...emptyFicha },
          materias: data.materias ?? [],
          empaques: data.empaques ?? [],
          recursosTangibles: data.recursosTangibles ?? [],
          recursosIntangibles: data.recursosIntangibles ?? [],
          parametrosNomina: {
            salarioMinimoLegal: Number(data.parametrosNomina?.salarioMinimoLegal || 0),
            auxilioTransporte: Number(data.parametrosNomina?.auxilioTransporte || 0),
            porcentajeSalud: Number(data.parametrosNomina?.porcentajeSalud || 0),
            porcentajePension: Number(data.parametrosNomina?.porcentajePension || 0),
          },
          empleadosNomina: (data.empleadosNomina ?? []).map((e: any) => ({
            id: String(e.id || uid()),
            rol: String(e.rol || ""),
            salarioBasico: Number(e.salarioBasico || 0),
            diasLiquidados: Number(e.diasLiquidados || 30),
            salarioDevengado: Number(e.salarioDevengado || 0),
            horasExtras: Number(e.horasExtras || 0),
            recargosNocturnos: Number(e.recargosNocturnos || 0),
            domFestivo: Number(e.domFestivo || 0),
            auxilioTransporteAuto: Boolean(e.auxilioTransporteAuto),
            auxilioTransporteManual: Number(e.auxilioTransporteManual || 0),
            fondoSolidaridad: Number(e.fondoSolidaridad || 0),
            retencionFuente: Number(e.retencionFuente || 0),
            otrasDeducciones: Number(e.otrasDeducciones || 0),
            sena: e.sena != null ? Number(e.sena) : null,
            icbf: e.icbf != null ? Number(e.icbf) : null,
            cajaCompensacion: e.cajaCompensacion != null ? Number(e.cajaCompensacion) : null,
            aporteSaludEmpleador: e.aporteSaludEmpleador != null ? Number(e.aporteSaludEmpleador) : null,
          })),
          densidadLeche: Number(data.proyecto.densidadLeche ?? 0),
          densidadCrema: Number(data.proyecto.densidadCrema ?? 0),
          proyecciones: {
            anos: data.proyecciones?.map((p: { ano: number }) => Number(p.ano)) ?? [],
            estudiantes: data.estudiantes ?? [],
            inversiones: data.inversiones ?? [],
            capitalTrabajo: data.capitalTrabajo ?? [],
            demanda: data.demanda ?? [],
            materiasPrimas: data.materiasPrimasProyeccion ?? [],
            costos: data.costos ?? [],
            cif: data.cif ?? [],
            gastosAdmin: data.gastosAdmin ?? [],
            resultados: data.resultados ?? [],
            flujoCaja: data.flujoCaja ?? [],
            indicadores: data.indicadores ?? null,
          },
        });
      } catch (error) {
        set({ loading: false, isLoaded: false, error: error instanceof Error ? error.message : "No fue posible cargar el estudio desde el backend" });
        console.error("[estudio-tecnico] Error cargando desde backend:", error);
      }
    })().finally(() => {
      loadFromApiPromise = null;
    });

    return loadFromApiPromise;
  },

  setTab: (t) => set({ activeTab: t }),
  setField: (key, value) => set((s) => ({ ...s, [key]: value })),

  addMateria: () =>
    set((s) => ({
      materias: [...s.materias, { id: uid(), nombre: "", unidad: "Kilogramos", cantidadRequerida: 0, descripcionCosto: "", costoUnitario: 0 }],
    })),
  updateMateria: (id, key, value) =>
    set((s) => ({
      materias: s.materias.map((m) => (m.id === id ? { ...m, [key]: value } : m)),
    })),
  removeMateria: (id) => set((s) => ({ materias: s.materias.filter((m) => m.id !== id) })),

  addEmpaque: () =>
    set((s) => ({
      empaques: [...s.empaques, { id: uid(), nombre: "", unidad: "Unidad", cantidadRequerida: 1, precioGeneral: 0, descripcionCosto: "", costoUnitario: 0 }],
    })),
  updateEmpaque: (id, key, value) =>
    set((s) => ({
      empaques: s.empaques.map((e) => (e.id === id ? { ...e, [key]: value } : e)),
    })),
  removeEmpaque: (id) => set((s) => ({ empaques: s.empaques.filter((e) => e.id !== id) })),

  addRecursoTangible: (categoria) =>
    set((s) => ({
      recursosTangibles: [...s.recursosTangibles, { id: uid(), nombre: "", costo: 0, categoria }],
    })),
  updateRecursoTangible: (id, key, value) =>
    set((s) => ({
      recursosTangibles: s.recursosTangibles.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
    })),
  removeRecursoTangible: (id) =>
    set((s) => ({
      recursosTangibles: s.recursosTangibles.filter((r) => r.id !== id),
    })),

  addRecursoIntangible: (categoria) =>
    set((s) => ({
      recursosIntangibles: [...s.recursosIntangibles, { id: uid(), nombre: "", costo: 0, categoria }],
    })),
  updateRecursoIntangible: (id, key, value) =>
    set((s) => ({
      recursosIntangibles: s.recursosIntangibles.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
    })),
  removeRecursoIntangible: (id) =>
    set((s) => ({
      recursosIntangibles: s.recursosIntangibles.filter((r) => r.id !== id),
    })),

  setParametrosNomina: (p) => set((s) => ({ parametrosNomina: { ...s.parametrosNomina, ...p } })),

  addEmpleadoNomina: () =>
    set((s) => ({
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
  updateEmpleadoNomina: (id, key, value) =>
    set((s) => ({
      empleadosNomina: s.empleadosNomina.map((e) => (e.id === id ? { ...e, [key]: value } : e)),
    })),
  removeEmpleadoNomina: (id) =>
    set((s) => ({
      empleadosNomina: s.empleadosNomina.filter((e) => e.id !== id),
    })),

  updateFichaTecnica: (key, value) =>
    set((s) => ({
      fichaTecnica: { ...s.fichaTecnica, [key]: value },
      ...(key === "producto" ? { nombreProducto: value } : {}),
    })),
}));
