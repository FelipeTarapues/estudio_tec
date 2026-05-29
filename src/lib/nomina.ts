import type { EmpleadoNomina, ParametrosNomina } from "@/types";

const DIAS_MES_LABORAL = 30;

/** Salario proporcional a los días liquidados (base 30 días). */
export function salarioDevengadoCalculado(e: EmpleadoNomina): number {
  if (e.diasLiquidados <= 0) return 0;
  return (e.salarioBasico / DIAS_MES_LABORAL) * e.diasLiquidados;
}

/** Base de cotización (sin auxilio de transporte): salud y pensión en Colombia. */
export function baseCotizacion(e: EmpleadoNomina): number {
  return (
    salarioDevengadoCalculado(e) +
    e.horasExtras +
    e.recargosNocturnos +
    e.domFestivo
  );
}

export function saludEmpleado(e: EmpleadoNomina, p: ParametrosNomina): number {
  return baseCotizacion(e) * p.porcentajeSalud;
}

export function pensionEmpleado(e: EmpleadoNomina, p: ParametrosNomina): number {
  return baseCotizacion(e) * p.porcentajePension;
}

export function auxilioEfectivo(
  e: EmpleadoNomina,
  p: ParametrosNomina,
): number {
  if (e.auxilioTransporteAuto) {
    const tope = 2 * p.salarioMinimoLegal;
    return e.salarioBasico <= tope ? p.auxilioTransporte : 0;
  }
  return e.auxilioTransporteManual;
}

export function totalDevengado(e: EmpleadoNomina, p: ParametrosNomina): number {
  const aux = auxilioEfectivo(e, p);
  return (
    salarioDevengadoCalculado(e) +
    e.horasExtras +
    e.recargosNocturnos +
    e.domFestivo +
    aux
  );
}

export function netoPagado(e: EmpleadoNomina, p: ParametrosNomina): number {
  const t = totalDevengado(e, p);
  return (
    t -
    saludEmpleado(e, p) -
    pensionEmpleado(e, p) -
    e.fondoSolidaridad -
    e.retencionFuente -
    e.otrasDeducciones
  );
}
