"use client";
import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import {
  costoLineaEmpaque,
  costoLineaMateria,
  costoTotalProducto,
  costoUnitarioEmpaque,
  costoUnitarioMateria,
} from "@/lib/costos";
import { FORMULAS } from "@/lib/formulas";
import { CostDonutChart } from "@/components/charts/CostDonutChart";
import { InsumosBarChart } from "@/components/charts/InsumosBarChart";
import { Card, CardTitle, Button, fmtDec, KpiCard, ChartLegend, SectionHeader } from "@/components/ui";

function etiquetaUnidad(unidadMasa: string): string {
  if (unidadMasa === "unidades") return "unidad";
  if (unidadMasa.endsWith("s")) return unidadMasa.slice(0, -1);
  return unidadMasa;
}

export default function TabResumen() {
  const {
    nombreProducto, masaTotal, unidadMasa,
    materias, empaques, recursosTangibles, recursosIntangibles, setTab,
  } = useStore();

  const { fabricacion: costoFabricacion, embalaje: costoEmbalaje, total: costoTotal, porUnidad: costoPorUnidad } =
    costoTotalProducto(materias, empaques, masaTotal);

  const totalTangibles = recursosTangibles.reduce((a, r) => a + (Number(r.costo) || 0), 0);
  const totalIntangibles = recursosIntangibles.reduce((a, r) => a + (Number(r.costo) || 0), 0);

  const donutData = useMemo(
    () => [
      { name: "Fabricación", value: costoFabricacion, color: "var(--terra)" },
      { name: "Embalaje", value: costoEmbalaje, color: "#9c5eb8" },
    ],
    [costoFabricacion, costoEmbalaje],
  );

  const insumosChart = useMemo(
    () =>
      [...materias]
        .map((m) => ({ nombre: m.nombre || "Sin nombre", costo: costoLineaMateria(m) }))
        .sort((a, b) => b.costo - a.costo)
        .slice(0, 6),
    [materias],
  );

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Resumen de costos"
        sub={`Vista ejecutiva de ${nombreProducto} · Lote de ${masaTotal} ${unidadMasa}. Las gráficas se actualizan al editar materias y empaque.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <KpiCard
          label="Costo de fabricación"
          value={`$${fmtDec(costoFabricacion)}`}
          sub="Materias primas del lote"
          accent="var(--terra)"
          bg="linear-gradient(145deg, #fff8f4 0%, #fff 100%)"
          formula={FORMULAS.costoFabricacion}
        />
        <KpiCard
          label="Costo de embalaje"
          value={`$${fmtDec(costoEmbalaje)}`}
          sub={`× ${masaTotal} unidades de producción`}
          accent="#9c5eb8"
          bg="linear-gradient(145deg, #faf5fc 0%, #fff 100%)"
          formula={FORMULAS.costoEmbalaje}
        />
        <KpiCard
          label="Costo total del producto"
          value={`$${fmtDec(costoTotal)}`}
          sub={`$${fmtDec(costoPorUnidad)} por ${etiquetaUnidad(unidadMasa)}`}
          accent="var(--forest)"
          bg="linear-gradient(145deg, #eef6f0 0%, #fff 100%)"
          formula={FORMULAS.costoTotalProducto}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="kpi-card p-5" style={{ background: "var(--surface)" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#5d4e37" }}>
            Inversión tangibles
          </p>
          <p className="font-serif text-2xl" style={{ color: "var(--ink)" }}>${fmtDec(totalTangibles)}</p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Pestaña Recursos</p>
        </div>
        <div className="kpi-card p-5" style={{ background: "var(--surface)" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--forest)" }}>
            Inversión intangibles
          </p>
          <p className="font-serif text-2xl" style={{ color: "var(--ink)" }}>${fmtDec(totalIntangibles)}</p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Software, licencias y procesos</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <Card className="overflow-visible">
          <CardTitle formula={FORMULAS.distribucionCostos}>Distribución del costo total</CardTitle>
          <CostDonutChart data={donutData} total={costoTotal} />
          <ChartLegend
            items={donutData.map((d) => ({
              label: `${d.name} (${costoTotal > 0 ? ((d.value / costoTotal) * 100).toFixed(1) : 0}%)`,
              color: d.color,
            }))}
          />
        </Card>

        <Card>
          <CardTitle formula={FORMULAS.costoLineaMateria}>Top insumos por costo</CardTitle>
          <InsumosBarChart data={insumosChart} />
        </Card>
      </div>

      <Card>
        <CardTitle>Detalle — Materias primas</CardTitle>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--cream)" }}>
                {["Materia prima", "Unidad", "Cant. lote", "Descripción", "C. unitario", "C. total"].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {materias.map((m) => {
                const costo = costoLineaMateria(m);
                const unitario = costoUnitarioMateria(m);
                return (
                  <tr key={m.id} className="border-t hover:bg-white/80 transition-colors" style={{ borderColor: "var(--border)" }}>
                    <td className="py-2.5 px-3 font-medium">{m.nombre || "—"}</td>
                    <td className="py-2.5 px-3 text-muted">{m.unidad}</td>
                    <td className="py-2.5 px-3 tabular-nums">{m.cantidadRequerida}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: "var(--muted)" }}>{m.descripcionCosto}</td>
                    <td className="py-2.5 px-3 tabular-nums">${fmtDec(unitario)}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold tabular-nums" style={{ background: "rgba(196,113,74,0.12)", color: "var(--terra-dark)" }}>
                        ${fmtDec(costo)}
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr style={{ background: "rgba(196,113,74,0.08)" }}>
                <td colSpan={5} className="py-3 px-3 font-bold" style={{ color: "var(--terra)" }}>Costo de fabricación</td>
                <td className="py-3 px-3 font-bold tabular-nums" style={{ color: "var(--terra)" }}>${fmtDec(costoFabricacion)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardTitle formula={FORMULAS.costoLineaEmpaque}>Detalle — Empaque</CardTitle>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--cream)" }}>
                {["Material", "Unidad", "Cant. × lote", "Precio paquete", "Descripción", "Costo lote"].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empaques.map((e) => {
                const linea = costoLineaEmpaque(e, masaTotal);
                const unitario = costoUnitarioEmpaque(e);
                return (
                  <tr key={e.id} className="border-t hover:bg-white/80" style={{ borderColor: "var(--border)" }}>
                    <td className="py-2.5 px-3 font-medium">{e.nombre || "—"}</td>
                    <td className="py-2.5 px-3" style={{ color: "var(--muted)" }}>{e.unidad}</td>
                    <td className="py-2.5 px-3 tabular-nums">{e.cantidadRequerida} × {masaTotal}</td>
                    <td className="py-2.5 px-3 tabular-nums">${fmtDec(e.precioGeneral)}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: "var(--muted)" }}>{e.descripcionCosto}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold tabular-nums" style={{ background: "#f3e5f5", color: "#7b1fa2" }}>
                        ${fmtDec(linea)}
                      </span>
                      <span className="block text-[10px] mt-0.5 tabular-nums" style={{ color: "var(--muted)" }}>
                        ${fmtDec(unitario)}/ud.
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr style={{ background: "#faf5fc" }}>
                <td colSpan={5} className="py-3 px-3 font-bold" style={{ color: "#7b1fa2" }}>Costo de embalaje</td>
                <td className="py-3 px-3 font-bold tabular-nums" style={{ color: "#7b1fa2" }}>${fmtDec(costoEmbalaje)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div
        className="rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, var(--forest) 0%, #2d4a3a 100%)",
          color: "#fff",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-70">Costo total del producto</p>
          <p className="font-serif text-4xl sm:text-5xl leading-none tabular-nums">${fmtDec(costoTotal)}</p>
          <p className="text-sm mt-3 opacity-80">
            {nombreProducto} · {masaTotal} {unidadMasa} · ${fmtDec(costoPorUnidad)} / {etiquetaUnidad(unidadMasa)}
          </p>
        </div>
        <div className="text-right text-sm space-y-1 opacity-90">
          <div>Fabricación: <strong className="tabular-nums">${fmtDec(costoFabricacion)}</strong></div>
          <div>Embalaje: <strong className="tabular-nums">${fmtDec(costoEmbalaje)}</strong></div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap no-print">
        <Button variant="terra" onClick={() => window.print()}>Imprimir / PDF</Button>
        <Button variant="outline" onClick={() => setTab("recursos")}>Recursos</Button>
        <Button variant="outline" onClick={() => setTab("nomina")}>Nómina</Button>
        <Button variant="outline" onClick={() => setTab("proyecciones")}>Proyecciones</Button>
        <Button variant="ghost" onClick={() => setTab("materias")}>← Materias</Button>
      </div>
    </div>
  );
}
