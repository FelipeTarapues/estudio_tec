import type { MaterialEmpaque, MateriaPrima } from "@/types";

/** Extrae cuántas unidades trae un empaque: «100 por caja», «25 cajas por precio». */
export function unidadesPorPaquete(descripcion: string): number | null {
  const d = descripcion.trim().toLowerCase();
  if (!d) return null;

  const por = d.match(/(\d+(?:[.,]\d+)?)\s*por\s*(?:caja|unidad|rollo|paquete|bolsa)?/);
  if (por) return parseNum(por[1]);

  const cajasPorPrecio = d.match(/(\d+(?:[.,]\d+)?)\s*cajas?\s*por\s*precio/);
  if (cajasPorPrecio) return parseNum(cajasPorPrecio[1]);

  const xUnidad = d.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(?:caja|unidad)/);
  if (xUnidad) return parseNum(xUnidad[1]);

  return null;
}

/** Precio por unidad de empaque a partir del precio del paquete y la descripción. */
export function costoUnitarioEmpaque(e: MaterialEmpaque): number {
  const u = unidadesPorPaquete(e.descripcionCosto);
  if (u && u > 0 && e.precioGeneral > 0) {
    return e.precioGeneral / u;
  }
  return e.costoUnitario;
}

/**
 * Costo de empaque para el lote.
 * `cantidadRequerida` = unidades de empaque por cada unidad de producto terminado.
 */
export function costoLineaEmpaque(
  e: MaterialEmpaque,
  unidadesProduccion: number,
): number {
  const porUnidad = Math.max(0, e.cantidadRequerida) * costoUnitarioEmpaque(e);
  return porUnidad * Math.max(0, unidadesProduccion);
}

export function costoEmbalaje(
  empaques: MaterialEmpaque[],
  unidadesProduccion: number,
): number {
  return empaques.reduce(
    (acc, e) => acc + costoLineaEmpaque(e, unidadesProduccion),
    0,
  );
}

/**
 * Interpreta descripciones como «$500 X Litro», «Costo por 0.75 L», «Costo por 500 ml».
 * Si no hay patrón, usa el costo unitario guardado.
 */
export function costoUnitarioMateria(m: MateriaPrima): number {
  const d = m.descripcionCosto.trim();
  if (!d) return m.costoUnitario;

  const precioXLitro = d.match(
    /\$?\s*([\d.,]+)\s*[xX×]\s*(?:litro|l\b)/i,
  );
  if (precioXLitro) return parseNum(precioXLitro[1]);

  const porVolumen = d.match(/costo\s+por\s+([\d.,]+)\s*(ml|l|litro)\b/i);
  if (porVolumen && m.costoUnitario > 0) {
    const volumen = parseNum(porVolumen[1]);
    const medida = porVolumen[2].toLowerCase();
    const unidad = m.unidad.toLowerCase();
    if (volumen > 0) {
      if (medida === "ml" && unidad.includes("ml")) {
        return m.costoUnitario / volumen;
      }
      if ((medida === "l" || medida === "litro") && unidad.includes("litro")) {
        return m.costoUnitario / volumen;
      }
    }
  }

  return m.costoUnitario;
}

/** Materias primas: cantidades ya son para el lote completo (no se multiplican por masa total). */
export function costoLineaMateria(m: MateriaPrima): number {
  return Math.max(0, m.cantidadRequerida) * costoUnitarioMateria(m);
}

export function costoFabricacion(materias: MateriaPrima[]): number {
  return materias.reduce((acc, m) => acc + costoLineaMateria(m), 0);
}

export function costoTotalProducto(
  materias: MateriaPrima[],
  empaques: MaterialEmpaque[],
  unidadesProduccion: number,
): { fabricacion: number; embalaje: number; total: number; porUnidad: number } {
  const fabricacion = costoFabricacion(materias);
  const embalaje = costoEmbalaje(empaques, unidadesProduccion);
  const total = fabricacion + embalaje;
  const porUnidad =
    unidadesProduccion > 0 ? total / unidadesProduccion : 0;
  return { fabricacion, embalaje, total, porUnidad };
}

function parseNum(raw: string): number {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
}
