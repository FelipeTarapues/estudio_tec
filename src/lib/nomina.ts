import type { EmpleadoNomina, ParametrosNomina } from "@/types";

const DIAS_MES_LABORAL = 30;

/** Salario proporcional a los días liquidados (base 30 días). */
export function salarioDevengadoCalculado(e: EmpleadoNomina): number {
  const dias = Number(e.diasLiquidados) || 0;
  const basico = Number(e.salarioBasico) || 0;
  if (dias <= 0) return 0;
  return (basico / DIAS_MES_LABORAL) * dias;
}

/** Base de cotización (sin auxilio de transporte): salud y pensión en Colombia. */
export function baseCotizacion(e: EmpleadoNomina): number {
  return (
    salarioDevengadoCalculado(e) +
    (Number(e.horasExtras) || 0) +
    (Number(e.recargosNocturnos) || 0) +
    (Number(e.domFestivo) || 0)
  );
}

export function saludEmpleado(e: EmpleadoNomina, p: ParametrosNomina): number {
  return baseCotizacion(e) * (Number(p.porcentajeSalud) || 0);
}

export function pensionEmpleado(e: EmpleadoNomina, p: ParametrosNomina): number {
  return baseCotizacion(e) * (Number(p.porcentajePension) || 0);
}

export function auxilioEfectivo(
  e: EmpleadoNomina,
  p: ParametrosNomina,
): number {
  const smmlv = Number(p.salarioMinimoLegal) || 0;
  const aux = Number(p.auxilioTransporte) || 0;
  const basico = Number(e.salarioBasico) || 0;
  if (e.auxilioTransporteAuto) {
    const tope = 2 * smmlv;
    return basico <= tope ? aux : 0;
  }
  return Number(e.auxilioTransporteManual) || 0;
}

export function totalDevengado(e: EmpleadoNomina, p: ParametrosNomina): number {
  const aux = auxilioEfectivo(e, p);
  return (
    salarioDevengadoCalculado(e) +
    (Number(e.horasExtras) || 0) +
    (Number(e.recargosNocturnos) || 0) +
    (Number(e.domFestivo) || 0) +
    aux
  );
}

export function netoPagado(e: EmpleadoNomina, p: ParametrosNomina): number {
  const t = totalDevengado(e, p);
  return (
    t -
    saludEmpleado(e, p) -
    pensionEmpleado(e, p) -
    (Number(e.fondoSolidaridad) || 0) -
    (Number(e.retencionFuente) || 0) -
    (Number(e.otrasDeducciones) || 0)
  );
}
