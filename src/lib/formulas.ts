/** Textos de fórmulas para tooltips (símbolos legibles en pantalla). */
export const FORMULAS = {
  costoLineaMateria:
    "Costo total = Cantidad (lote) × Costo unitario\n\nEl costo unitario puede leerse de la descripción (ej. «$500 × litro» o «costo por 0,75 L»).",
  costoFabricacion:
    "Costo de fabricación = Σ (cantidad × costo unitario) de cada materia prima del lote.",
  costoUnitarioEmpaque:
    "Costo unitario = Precio del paquete ÷ Unidades por paquete\n\nEj.: $100.000 ÷ 100 unidades = $1.000 por unidad de producto.",
  costoLineaEmpaque:
    "Costo del lote = Cant. por unidad de producto × Costo unitario × Unidades de producción\n\nEj.: 1 × $1.000 × 200 = $200.000",
  costoEmbalaje: "Costo de embalaje = Σ costo del lote de cada material de empaque.",
  costoTotalProducto:
    "Costo total = Costo de fabricación + Costo de embalaje\n\nCosto por unidad = Costo total ÷ Masa total de producción",
  salarioDevengado:
    "Salario devengado = (Salario básico ÷ 30) × Días liquidados",
  baseCotizacion:
    "Base cotización = Devengado + Horas extras + Recargos nocturnos + Domingo/festivo\n\n(Sin auxilio de transporte)",
  saludPension:
    "Salud empleado = Base cotización × 4%\nPensión empleado = Base cotización × 4%",
  totalDevengado:
    "Total devengado = Devengado + Extras + Recargos + Dom/festivo + Auxilio de transporte",
  netoPagado:
    "Neto pagado = Total devengado − Salud − Pensión − FSP − Retefuente − Otras deducciones",
  auxilioTransporte:
    "Si «auxilio auto» está activo: auxilio = valor de referencia solo si salario básico ≤ 2 × SMMLV; si no, $0.",
  inversionTangibles: "Total tangibles = Σ costo de cada ítem (maquinaria, equipos, herramientas, infraestructura).",
  inversionIntangibles: "Total intangibles = Σ costo de software, know-how, licencias y procesos.",
  distribucionCostos: "% del ítem = (Costo del ítem ÷ Costo total del producto) × 100",

  // —— Proyecciones (plan de negocio) ——
  proyInversionTotal:
    "Inversión total = Edificaciones + Maquinaria + Muebles + Vehículos + Equipos de cómputo + Diferidos",
  proyTir:
    "TIR = Tasa interna de retorno que hace VPN = 0\n\nSe calcula con los flujos de caja del proyecto (inversión inicial + efectivo por año).",
  proyVpn:
    "VPN = Σ [ Flujo año t ÷ (1 + i)^t ]\n\ni = tasa de interés de oportunidad (ej. 12 % anual)",
  proyCapitalTrabajo:
    "Capital de trabajo (mes) = Mano de obra del mes + Gastos de administración y ventas del mes",
  proyDemandaCantidad:
    "Cantidad año t = Cantidad año 1 × (1 + crecimiento sector)^t\n\nEn la plantilla: base 9.910 uds. (año 1) con crecimiento proyectado.",
  proyTotalIngreso:
    "Total ingreso = Cantidad vendida × Precio de venta unitario",
  proyProvisionDeudas:
    "Provisión deudas malas = Total ingreso × % provisión\n\nPlantilla: 3 % sobre ventas.",
  proyVentasCredito:
    "Ventas a crédito = Total ingreso × % crédito\n\nPlantilla: 40 %.",
  proyVentasContado:
    "Ventas de contado = Total ingreso × % contado\n\nPlantilla: 60 %.",
  proyCostoMpUnd:
    "Costo por unidad (UND) = Gramos o ml del insumo × Costo proveedor (por gr/ml)\n\nTotal MP año ≈ Cantidad anual × costos de materia prima.",
  proyMargenBruto:
    "Margen bruto % = ((Ventas − Costo mercancía vendida) ÷ Ventas) × 100",
  proyPagoMp:
    "Pago MP contado = Costo MP anual × % pago de contado\nPago MP crédito = Costo MP anual × % pago a crédito",
  proyCif:
    "CIF año t = Consumo mensual × 12, actualizado con IPC\n\nTotal CIF = Energía + Agua + otros indirectos.",
  proyGastosAdmin:
    "Gastos admin. y ventas = Nómina administración + Nómina ventas + Publicidad + Comisiones\n\nProyectados con incremento anual (IPC / inflación en plantilla).",
  proyUtilidadBruta:
    "Utilidad bruta = Ventas − Costo de mercancía vendida (CMV)",
  proyUai:
    "UAI = Utilidad bruta − Gastos administración y ventas − Provisión deudas malas",
  proyImpuestoRenta:
    "Impuesto de renta = UAI × 35 %\n\n(Según tarifa corporativa en la plantilla del plan de negocio.)",
  proyUtilidadNeta:
    "Utilidad neta = UAI − Impuesto de renta\n\nReserva legal = 10 % UN · Dividendos = 10 % UN (plantilla).",
  proyFlujoIngresos:
    "Total ingresos del año (flujo) = Ventas de contado cobradas en el período",
  proyFlujoEgresos:
    "Total egresos = Pago MP contado + Mano de obra + CIF + Gastos admin. + Impuesto de renta (efecto caja)",
  proyEfectivoGenerado:
    "Efectivo generado = Total ingresos del año − Total egresos del año\n\nAño 0: incluye inversión inicial (salida de caja).",
  proyInversionInicial:
    "Inversión inicial (año 0) = Total inversiones en activos y capital de trabajo de arranque",
} as const;
