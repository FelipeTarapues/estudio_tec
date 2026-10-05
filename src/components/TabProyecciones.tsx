"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import type { Tab } from "@/types";
import { FORMULAS } from "@/lib/formulas";
import { FormulaTip } from "@/components/FormulaTip";
import { Card, CardTitle, SectionHeader, Button, KpiCard, fmt, fmtDec } from "@/components/ui";

function AnosHeader({ anos }: { anos: number[] }) {
  return (
    <>
      {anos.map((y) => (
        <th
          key={y}
          className="text-right py-2 px-2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
          style={{ color: "var(--muted)" }}
        >
          {y}
        </th>
      ))}
    </>
  );
}

function FilaAnual({
  label,
  valores,
  formula,
  destacar = false,
  negativo = false,
  formato = "moneda",
}: {
  label: string;
  valores: number[];
  formula?: string;
  destacar?: boolean;
  negativo?: boolean;
  formato?: "moneda" | "numero";
}) {
  return (
    <tr
      className="border-b"
      style={{
        borderColor: "var(--border)",
        background: destacar ? "rgba(196, 113, 74, 0.06)" : undefined,
        fontWeight: destacar ? 600 : undefined,
      }}
    >
      <td
        className="py-2 px-3 text-sm sticky left-0 z-10 min-w-[180px] sm:min-w-[220px]"
        style={{ color: "var(--ink)", background: destacar ? "#FFF8F4" : "var(--surface)" }}
      >
        <span className="inline-flex items-center gap-1 flex-wrap">
          {label}
          {formula && <FormulaTip formula={formula} />}
        </span>
      </td>
      {valores.map((v, i) => (
        <td
          key={i}
          className="py-2 px-2 text-right text-sm tabular-nums whitespace-nowrap"
          style={{ color: negativo && v < 0 ? "#c0392b" : "var(--ink)" }}
        >
          {formato === "numero"
            ? fmtDec(v, v % 1 === 0 ? 0 : 1)
            : `$${fmt(Math.round(v))}`}
        </td>
      ))}
    </tr>
  );
}

function TablaAnual({
  titulo,
  formula,
  anos,
  children,
}: {
  titulo: string;
  formula?: string;
  anos: number[];
  children: ReactNode;
}) {
  return (
    <Card>
      <CardTitle formula={formula}>{titulo}</CardTitle>
      <div className="overflow-x-auto -mx-1 rounded-xl border" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm min-w-[620px] sm:min-w-[720px]">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--cream)" }}>
              <th
                className="text-left py-3 px-3 text-[10px] font-bold uppercase tracking-wider sticky left-0 z-10 min-w-[180px] sm:min-w-[220px]"
                style={{ color: "var(--muted)", background: "var(--cream)" }}
              >
                Concepto
              </th>
              <AnosHeader anos={anos} />
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </Card>
  );
}

export default function TabProyecciones() {
  const { nombreProducto, fichaTecnica, setTab, proyecciones } = useStore();
  const router = useRouter();
  const go = (t: Tab) => { setTab(t); router.push("/"+t); };
  const PROYECCION_ANOS = proyecciones.anos;
  const producto = nombreProducto;
  const empresa = fichaTecnica.fabricante;
  const PROYECCION_META = { estudiantes: proyecciones.estudiantes };
  const INVERSIONES = { total: proyecciones.inversiones.reduce((sum, item) => sum + Number(item.valor), 0), lineas: proyecciones.inversiones };
  const CAPITAL_TRABAJO = { meses: proyecciones.capitalTrabajo };
  const DEMANDA = { precioVenta: proyecciones.demanda[0]?.ingreso / (proyecciones.demanda[0]?.cantidad || 1) || 0, provisionDeudasMalas: 0.03, ventasCredito: 0.4, ventasContado: 0.6, porAno: proyecciones.demanda };
  const MATERIA_PRIMA_PROY = proyecciones.materiasPrimas;
  const COSTOS_MP_ANUAL = Number(proyecciones.costos[0]?.costoMpAnual) || 0;
  const MARGEN_BRUTO_PCT = proyecciones.costos.map((item) => Number(item.margenBrutoPct) || 0);
  const PAGO_CONTADO_MP = Number(proyecciones.costos[0]?.pagoContadoMp) || 0;
  const PAGO_CREDITO_MP = Number(proyecciones.costos[0]?.pagoCreditoMp) || 0;
  const CIF = { lineas: [{ concepto: "Energía eléctrica", valores: proyecciones.cif.map((item) => Number(item.energiaElectrica) || 0) }, { concepto: "Agua", valores: proyecciones.cif.map((item) => Number(item.agua) || 0) }], totales: proyecciones.cif.map((item) => Number(item.total) || 0) };
  const GASTOS_ADMIN = { lineas: [{ concepto: "Nómina administración", valores: proyecciones.gastosAdmin.map((item) => Number(item.nominaAdministracion) || 0) }, { concepto: "Publicidad", valores: proyecciones.gastosAdmin.map((item) => Number(item.publicidad) || 0) }], totales: proyecciones.gastosAdmin.map((item) => Number(item.total) || 0) };
  const resultValues = (key: string) => proyecciones.resultados.map((row) => Number(row[key] || 0));
  const cashValues = (key: string) => proyecciones.flujoCaja.map((row) => Number(row[key] || 0));
  const ESTADO_RESULTADOS = { ventas: resultValues("ventas"), costoMercancia: resultValues("costoMercancia"), utilidadBruta: resultValues("utilidadBruta"), gastosAdminVentas: resultValues("gastosAdminVentas"), provisionDeudas: resultValues("provisionDeudas"), utilidadAntesImpuestos: resultValues("utilidadAntesImpuestos"), impuestoRenta: resultValues("impuestoRenta"), utilidadNeta: resultValues("utilidadNeta"), reservaLegal: resultValues("reservaLegal"), dividendos: resultValues("dividendos"), utilidadNetaFinal: resultValues("utilidadNetaFinal") };
  const FLUJO_CAJA = { ventasContado: cashValues("ventasContado"), totalIngresos: cashValues("totalIngresos"), pagoMpContado: cashValues("pagoMpContado"), manoObra: cashValues("manoObra"), cif: cashValues("cif"), gastosAdmin: cashValues("gastosAdmin"), impuestoRenta: cashValues("impuestoRenta"), totalEgresos: cashValues("totalEgresos"), efectivoGenerado: cashValues("efectivoGenerado"), inversionInicial: cashValues("inversionInicial")[0] || 0 };
  const INDICADORES = proyecciones.indicadores || { tir: 0, tasaInteresOportunidad: 0, vpn: 0 };

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Proyecciones financieras"
        sub={`Plan de negocio · ${empresa} · ${producto} · Horizonte ${PROYECCION_ANOS[0]}–${PROYECCION_ANOS[PROYECCION_ANOS.length - 1]}. Use el icono ? para ver cada fórmula.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <KpiCard
          label="Inversión total"
          value={`$${fmt(INVERSIONES.total)}`}
          sub="Activos fijos y montaje"
          accent="var(--terra)"
          bg="linear-gradient(145deg, #fff8f4 0%, #fff 100%)"
          formula={FORMULAS.proyInversionTotal}
        />
        <KpiCard
          label="TIR"
          value={`${(INDICADORES.tir * 100).toFixed(1)} %`}
          sub={`Tasa oportunidad: ${(INDICADORES.tasaInteresOportunidad * 100).toFixed(0)} %`}
          accent="var(--forest)"
          bg="linear-gradient(145deg, #eef6f0 0%, #fff 100%)"
          formula={FORMULAS.proyTir}
        />
        <KpiCard
          label="VPN"
          value={`$${fmt(INDICADORES.vpn)}`}
          sub="Valor presente neto del proyecto"
          accent="#5d4e37"
          bg="linear-gradient(145deg, #faf8f5 0%, #fff 100%)"
          formula={FORMULAS.proyVpn}
        />
      </div>

      <Card>
        <CardTitle>Datos del proyecto</CardTitle>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--muted)" }}>Empresa</dt>
            <dd className="font-medium mt-0.5">{empresa}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--muted)" }}>Producto</dt>
            <dd className="font-medium mt-0.5">{producto}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--muted)" }}>Equipo</dt>
            <dd className="mt-0.5">{PROYECCION_META.estudiantes.join(" · ")}</dd>
          </div>
        </dl>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <Card>
          <CardTitle formula={FORMULAS.proyInversionTotal}>Inversiones</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[260px]">
              <tbody>
                {INVERSIONES.lineas.map((l) => (
                  <tr key={l.concepto} className="border-b" style={{ borderColor: "var(--border)" }}>
                    <td className="py-2 pr-3">{l.concepto}</td>
                    <td className="py-2 text-right font-medium tabular-nums">${fmt(l.valor)}</td>
                  </tr>
                ))}
                <tr style={{ background: "rgba(196, 113, 74, 0.08)" }}>
                  <td className="py-2.5 font-bold" style={{ color: "var(--terra)" }}>Total inversiones</td>
                  <td className="py-2.5 text-right font-bold tabular-nums" style={{ color: "var(--terra)" }}>
                    ${fmt(INVERSIONES.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardTitle formula={FORMULAS.proyCapitalTrabajo}>Capital de trabajo (primeros 3 meses)</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[340px]">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  {["Mes", "Total", "Mano de obra", "Gastos admin."].map((h) => (
                    <th key={h} className="text-left py-2 px-2 text-[10px] font-bold uppercase" style={{ color: "var(--muted)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAPITAL_TRABAJO.meses.map((m) => (
                  <tr key={m.mes} className="border-b" style={{ borderColor: "var(--border)" }}>
                    <td className="py-2 px-2 font-medium">{m.mes}</td>
                    <td className="py-2 px-2 tabular-nums">${fmt(m.total)}</td>
                    <td className="py-2 px-2 tabular-nums">${fmt(m.manoObra)}</td>
                    <td className="py-2 px-2 tabular-nums">${fmt(m.gastosAdmin)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <TablaAnual anos={PROYECCION_ANOS} titulo="Proyección de demanda e ingresos" formula={FORMULAS.proyTotalIngreso}>
        <FilaAnual
          label="Cantidad (unidades)"
          valores={DEMANDA.porAno.map((d) => d.cantidad)}
          formula={FORMULAS.proyDemandaCantidad}
          formato="numero"
        />
        <tr className="border-b" style={{ borderColor: "var(--border)" }}>
          <td className="py-2 px-3 text-sm sticky left-0 z-10 min-w-[180px] sm:min-w-[220px]" style={{ background: "var(--surface)" }}>
            <span className="inline-flex items-center gap-1">
              Precio de venta
              <FormulaTip formula="Precio unitario constante en la plantilla (ej. $7.000 por unidad)." title="Precio" />
            </span>
          </td>
          {PROYECCION_ANOS.map((y) => (
            <td key={y} className="py-2 px-2 text-right text-sm tabular-nums">
              ${fmt(DEMANDA.precioVenta)}
            </td>
          ))}
        </tr>
        <FilaAnual
          label="Total ingreso"
          valores={DEMANDA.porAno.map((d) => d.ingreso)}
          formula={FORMULAS.proyTotalIngreso}
          destacar
        />
        <FilaAnual
          label={`Provisión deudas malas (${(DEMANDA.provisionDeudasMalas * 100).toFixed(0)} %)`}
          valores={DEMANDA.porAno.map((d) => -d.provision)}
          formula={FORMULAS.proyProvisionDeudas}
          negativo
        />
        <FilaAnual
          label={`Ventas crédito (${(DEMANDA.ventasCredito * 100).toFixed(0)} %)`}
          valores={DEMANDA.porAno.map((d) => d.credito)}
          formula={FORMULAS.proyVentasCredito}
        />
        <FilaAnual
          label={`Ventas contado (${(DEMANDA.ventasContado * 100).toFixed(0)} %)`}
          valores={DEMANDA.porAno.map((d) => d.contado)}
          formula={FORMULAS.proyVentasContado}
          destacar
        />
      </TablaAnual>

      <Card>
        <CardTitle formula={FORMULAS.proyCostoMpUnd}>Costo — materia prima (por lote / año 1)</CardTitle>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm min-w-[420px]">
            <thead>
              <tr style={{ background: "var(--cream)" }}>
                {["Materia prima", "g/ml", "Costo proveedor", "Costo UND"].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-[10px] font-bold uppercase whitespace-nowrap" style={{ color: "var(--muted)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATERIA_PRIMA_PROY.map((m) => (
                <tr key={m.nombre} className="border-t" style={{ borderColor: "var(--border)" }}>
                  <td className="py-2 px-3">{m.nombre}</td>
                  <td className="py-2 px-3 tabular-nums">{m.gramos}</td>
                  <td className="py-2 px-3 tabular-nums">${fmtDec(m.costoProveedor)}</td>
                  <td className="py-2 px-3 tabular-nums">${fmtDec(m.costoUnd)}</td>
                </tr>
              ))}
              <tr style={{ background: "rgba(196, 113, 74, 0.08)" }}>
                <td colSpan={3} className="py-2.5 px-3 font-bold" style={{ color: "var(--terra)" }}>
                  Costo MP anual (proyección)
                </td>
                <td className="py-2.5 px-3 font-bold tabular-nums" style={{ color: "var(--terra)" }}>
                  ${fmt(COSTOS_MP_ANUAL)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3 flex flex-wrap items-center gap-1" style={{ color: "var(--muted)" }}>
          <span>Margen bruto proyectado (2025–2030):</span>
          {MARGEN_BRUTO_PCT.map((p) => `${p.toFixed(1)}%`).join(" · ")}
          <FormulaTip formula={FORMULAS.proyMargenBruto} title="Margen bruto" />
          <span className="w-full sm:w-auto sm:ml-2">
            Pago MP: contado ${fmt(PAGO_CONTADO_MP)} · crédito ${fmt(PAGO_CREDITO_MP)}
            <FormulaTip formula={FORMULAS.proyPagoMp} title="Pago MP" />
          </span>
        </p>
      </Card>

      <TablaAnual anos={PROYECCION_ANOS} titulo="Costos indirectos de fabricación (CIF)" formula={FORMULAS.proyCif}>
        {CIF.lineas.map((l) => (
          <FilaAnual key={l.concepto} label={l.concepto} valores={l.valores} />
        ))}
        <FilaAnual label="Total CIF" valores={CIF.totales} destacar />
        <FilaAnual
          label="Mano de obra producción"
          valores={proyecciones.costos.map((item) => item.manoObraProduccionAnual)}
          formula="Costo anual de mano de obra directa en planta (dato de la plantilla de proyección)."
        />
      </TablaAnual>

      <TablaAnual anos={PROYECCION_ANOS} titulo="Gastos de administración y ventas" formula={FORMULAS.proyGastosAdmin}>
        {GASTOS_ADMIN.lineas.map((l) => (
          <FilaAnual key={l.concepto} label={l.concepto} valores={l.valores} />
        ))}
        <FilaAnual label="Total" valores={GASTOS_ADMIN.totales} destacar />
      </TablaAnual>

      <TablaAnual anos={PROYECCION_ANOS} titulo="Estado de resultados — pérdidas y ganancias" formula={FORMULAS.proyUai}>
        <FilaAnual label="Ventas" valores={ESTADO_RESULTADOS.ventas} formula={FORMULAS.proyTotalIngreso} />
        <FilaAnual
          label="(−) Costo mercancía vendida"
          valores={ESTADO_RESULTADOS.costoMercancia}
          formula="CMV = Costo de materia prima y producción asociado a lo vendido en el año."
          negativo
        />
        <FilaAnual
          label="(=) Utilidad bruta"
          valores={ESTADO_RESULTADOS.utilidadBruta}
          formula={FORMULAS.proyUtilidadBruta}
          destacar
          negativo
        />
        <FilaAnual
          label="(−) Gastos administración y ventas"
          valores={ESTADO_RESULTADOS.gastosAdminVentas}
          formula={FORMULAS.proyGastosAdmin}
          negativo
        />
        <FilaAnual
          label="(−) Provisión deudas malas"
          valores={ESTADO_RESULTADOS.provisionDeudas}
          formula={FORMULAS.proyProvisionDeudas}
          negativo
        />
        <FilaAnual
          label="(=) Utilidad antes de impuestos (UAI)"
          valores={ESTADO_RESULTADOS.utilidadAntesImpuestos}
          formula={FORMULAS.proyUai}
          destacar
          negativo
        />
        <FilaAnual
          label="(−) Impuesto de renta (35 %)"
          valores={ESTADO_RESULTADOS.impuestoRenta.map((v) => -v)}
          formula={FORMULAS.proyImpuestoRenta}
          negativo
        />
        <FilaAnual
          label="(=) Utilidad neta"
          valores={ESTADO_RESULTADOS.utilidadNeta}
          formula={FORMULAS.proyUtilidadNeta}
          destacar
          negativo
        />
        <FilaAnual label="Reserva legal (10 %)" valores={ESTADO_RESULTADOS.reservaLegal} formula="Reserva legal = 10 % × Utilidad neta" />
        <FilaAnual label="Dividendos (10 %)" valores={ESTADO_RESULTADOS.dividendos} formula="Dividendos = 10 % × Utilidad neta" />
        <FilaAnual
          label="Utilidad neta final"
          valores={ESTADO_RESULTADOS.utilidadNetaFinal}
          formula="UN final = Utilidad neta − Reserva legal − Dividendos"
          destacar
          negativo
        />
      </TablaAnual>

      <TablaAnual anos={PROYECCION_ANOS} titulo="Proyección flujo de caja" formula={FORMULAS.proyEfectivoGenerado}>
        <FilaAnual
          label="Ventas de contado"
          valores={FLUJO_CAJA.ventasContado}
          formula={FORMULAS.proyVentasContado}
        />
        <FilaAnual
          label="Total ingresos del año"
          valores={FLUJO_CAJA.totalIngresos}
          formula={FORMULAS.proyFlujoIngresos}
          destacar
        />
        <FilaAnual
          label="Pago MP de contado"
          valores={FLUJO_CAJA.pagoMpContado.map((v) => -v)}
          formula={FORMULAS.proyPagoMp}
          negativo
        />
        <FilaAnual
          label="Mano de obra"
          valores={FLUJO_CAJA.manoObra.map((v) => -v)}
          negativo
        />
        <FilaAnual
          label="CIF (sin depreciación)"
          valores={FLUJO_CAJA.cif.map((v) => -v)}
          formula={FORMULAS.proyCif}
          negativo
        />
        <FilaAnual
          label="Gastos administración y ventas"
          valores={FLUJO_CAJA.gastosAdmin.map((v) => -v)}
          formula={FORMULAS.proyGastosAdmin}
          negativo
        />
        <FilaAnual
          label="Impuesto de renta"
          valores={FLUJO_CAJA.impuestoRenta}
          formula={FORMULAS.proyImpuestoRenta}
        />
        <FilaAnual
          label="Total egresos del año"
          valores={FLUJO_CAJA.totalEgresos}
          formula={FORMULAS.proyFlujoEgresos}
          destacar
        />
        <FilaAnual
          label="Efectivo generado en el año"
          valores={FLUJO_CAJA.efectivoGenerado}
          formula={FORMULAS.proyEfectivoGenerado}
          destacar
        />
      </TablaAnual>

      <div
        className="rounded-2xl p-5 sm:p-6 mb-6 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, var(--forest) 0%, #2d4a3a 100%)",
          color: "#fff",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-70 mb-1 flex items-center gap-1">
            Inversión inicial (año 0)
            <FormulaTip formula={FORMULAS.proyInversionInicial} title="Año 0" />
          </p>
          <p className="font-serif text-2xl sm:text-3xl tabular-nums">${fmt(Math.abs(FLUJO_CAJA.inversionInicial))}</p>
        </div>
        <p className="opacity-85 text-xs max-w-md leading-relaxed">
          Valores según la hoja «Proyecciones» del plan de negocio. Los costos operativos del estudio técnico se editan en las pestañas Materias, Empaque y Nómina.
        </p>
      </div>

      <div className="flex gap-3 flex-wrap no-print">
        <Button variant="terra" onClick={() => window.print()}>
          Imprimir / PDF
        </Button>
        <Button variant="outline" onClick={() => go("resumen")}>
          Resumen de costos
        </Button>
        <Button variant="outline" onClick={() => go("nomina")}>
          Nómina
        </Button>
      </div>
    </div>
  );
}
