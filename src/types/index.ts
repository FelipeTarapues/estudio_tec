export interface MateriaPrima {
  id: string;
  nombre: string;
  unidad: string;
  cantidadRequerida: number; // cantidad total del lote (ej. litros o kg para toda la producción)
  descripcionCosto: string;
  costoUnitario: number; // precio de referencia; puede derivarse de la descripción (ej. $/litro)
}

export interface MaterialEmpaque {
  id: string;
  nombre: string;
  unidad: string;
  /** Unidades de empaque consumidas por cada unidad de producto terminado */
  cantidadRequerida: number;
  precioGeneral: number;
  descripcionCosto: string;
  costoUnitario: number; // derivado: precioGeneral ÷ unidades por paquete
}

/** Categorías según hoja «Costos de recursos tangibles» de la ficha técnica */
export type CategoriaTangible =
  | "maquinaria"
  | "equipos"
  | "herramientas"
  | "infraestructura";

/** Categorías según hoja «Costos de recursos intangibles» */
export type CategoriaIntangible =
  | "softwares"
  | "conocimiento_tecnico"
  | "licencias_permisos"
  | "procesos_metodos";

export interface RecursoTangible {
  id: string;
  nombre: string;
  costo: number;
  categoria: CategoriaTangible;
}

export interface RecursoIntangible {
  id: string;
  nombre: string;
  costo: number;
  categoria: CategoriaIntangible;
}

/** Parámetros de referencia — hoja «Calculo de nomina» */
export interface ParametrosNomina {
  salarioMinimoLegal: number;
  auxilioTransporte: number;
  porcentajeSalud: number;
  porcentajePension: number;
}

/** Una fila de liquidación mensual (devengados, deducciones, neto). */
export interface EmpleadoNomina {
  id: string;
  rol: string;
  salarioBasico: number;
  diasLiquidados: number;
  salarioDevengado: number;
  horasExtras: number;
  recargosNocturnos: number;
  domFestivo: number;
  /** Si es true: auxilio = referencia solo si salario básico ≤ 2×SMMLV */
  auxilioTransporteAuto: boolean;
  /** Valor mensual de auxilio (manual); ignorado si auxilioTransporteAuto */
  auxilioTransporteManual: number;
  fondoSolidaridad: number;
  retencionFuente: number;
  otrasDeducciones: number;
  sena?: number;
  icbf?: number;
  cajaCompensacion?: number;
  aporteSaludEmpleador?: number;
}

/** Contenido editable de la hoja «Ficha tecnica» del Excel */
export interface FichaTecnica {
  producto: string;
  fabricante: string;
  modelo: string;
  marca: string;
  presentacion: string;
  descripcionProducto: string;
  especificacionesTecnicas: string;
  instruccionesUso: string;
  beneficios: string;
  advertencias: string;
  composicion: string;
  empaque: string;
  rotulado: string;
  lugarElaboracion: string;
  fechaElaboracion: string;
  unidadVenta: string; // Removed hardcoded initialization
}

export interface ProyeccionData {
  anos: number[];
  estudiantes: string[];
  inversiones: { concepto: string; valor: number }[];
  capitalTrabajo: { mes: string; total: number; manoObra: number; gastosAdmin: number }[];
  demanda: { ano: number; cantidad: number; ingreso: number; provision: number; credito: number; contado: number }[];
  materiasPrimas: { nombre: string; gramos: number; costoProveedor: number; costoUnd: number }[];
  costos: { ano: number; costoMpAnual: number; margenBrutoPct: number; pagoContadoMp: number; pagoCreditoMp: number; manoObraProduccionAnual: number }[];
  cif: { ano: number; energiaElectrica: number; agua: number; total: number }[];
  gastosAdmin: { ano: number; nominaAdministracion: number; publicidad: number; total: number }[];
  resultados: Record<string, number>[];
  flujoCaja: Record<string, number>[];
  indicadores: { tasaInteresOportunidad: number; tir: number; vpn: number } | null;
}

export type Tab =
  | "ficha"
  | "materias"
  | "empaque"
  | "recursos"
  | "nomina"
  | "resumen"
  | "proyecciones";
