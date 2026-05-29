"use client";
import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { FORMULAS } from "@/lib/formulas";
import { InversionChart } from "@/components/charts/InversionChart";
import { Card, CardTitle, Input, SectionHeader, Button, fmtDec } from "@/components/ui";
import type { CategoriaIntangible, CategoriaTangible } from "@/types";

const CAT_T: { id: CategoriaTangible; label: string }[] = [
  { id: "maquinaria", label: "Maquinaria" },
  { id: "equipos", label: "Equipos" },
  { id: "herramientas", label: "Herramientas" },
  { id: "infraestructura", label: "Infraestructura" },
];

const CAT_I: { id: CategoriaIntangible; label: string }[] = [
  { id: "softwares", label: "Softwares" },
  { id: "conocimiento_tecnico", label: "Conocimiento técnico" },
  { id: "licencias_permisos", label: "Licencias, permisos y normativas" },
  { id: "procesos_metodos", label: "Procesos o métodos productivos" },
];

function sumBy<T extends { costo: number }>(rows: T[]) {
  return rows.reduce((a, r) => a + (Number(r.costo) || 0), 0);
}

export default function TabRecursos() {
  const {
    recursosTangibles,
    recursosIntangibles,
    updateRecursoTangible,
    removeRecursoTangible,
    addRecursoTangible,
    updateRecursoIntangible,
    removeRecursoIntangible,
    addRecursoIntangible,
    setTab,
  } = useStore();

  const totalT = sumBy(recursosTangibles);
  const totalI = sumBy(recursosIntangibles);

  const chartT = useMemo(
    () =>
      CAT_T.map(({ id, label }) => ({
        categoria: label,
        valor: sumBy(recursosTangibles.filter((r) => r.categoria === id)),
      })),
    [recursosTangibles],
  );

  const chartI = useMemo(
    () =>
      CAT_I.map(({ id, label }) => ({
        categoria: label.length > 14 ? `${label.slice(0, 12)}…` : label,
        valor: sumBy(recursosIntangibles.filter((r) => r.categoria === id)),
      })),
    [recursosIntangibles],
  );

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Recursos tangibles e intangibles"
        sub="Inversión en activos y know-how. Las barras muestran el peso de cada categoría sobre el total."
      />

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <Card>
          <CardTitle formula={FORMULAS.inversionTangibles}>Inversión tangibles por categoría</CardTitle>
          <InversionChart data={chartT} title="Tangibles" />
          <p className="text-center text-sm font-bold mt-2 tabular-nums" style={{ color: "var(--terra-dark)" }}>
            Total: ${fmtDec(totalT)}
          </p>
        </Card>
        <Card>
          <CardTitle formula={FORMULAS.inversionIntangibles}>Inversión intangibles por categoría</CardTitle>
          <InversionChart data={chartI} title="Intangibles" />
          <p className="text-center text-sm font-bold mt-2 tabular-nums" style={{ color: "var(--forest)" }}>
            Total: ${fmtDec(totalI)}
          </p>
        </Card>
      </div>

      <Card>
        <CardTitle>Recursos tangibles</CardTitle>
        <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
          Inversión en activos físicos: maquinaria, equipos, herramientas e infraestructura.
        </p>
        {CAT_T.map(({ id: cat, label }) => {
          const rows = recursosTangibles.filter((r) => r.categoria === cat);
          const sub = sumBy(rows);
          return (
            <div key={cat} className="mb-8 last:mb-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold" style={{ color: "var(--ink)" }}>{label}</h3>
                <Button variant="outline" className="!py-1 !px-2 !text-xs" onClick={() => addRecursoTangible(cat)}>
                  + Ítem
                </Button>
              </div>
              <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-white" style={{ borderColor: "var(--border)" }}>
                      <th className="text-left py-2 px-3 text-xs font-semibold uppercase" style={{ color: "var(--muted)" }}>Concepto</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold uppercase w-36" style={{ color: "var(--muted)" }}>Costo ($)</th>
                      <th className="w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} className="border-b" style={{ borderColor: "var(--border)" }}>
                        <td className="py-2 px-2">
                          <Input value={r.nombre} onChange={(v) => updateRecursoTangible(r.id, "nombre", v)} placeholder="Descripción" />
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            value={r.costo || ""}
                            onChange={(v) => updateRecursoTangible(r.id, "costo", parseFloat(v) || 0)}
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <button
                            type="button"
                            className="text-xs font-semibold px-1"
                            style={{ color: "#c0392b" }}
                            onClick={() => removeRecursoTangible(r.id)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr style={{ background: "var(--warm)" }}>
                      <td className="py-2 px-3 font-semibold text-xs" style={{ color: "var(--terra-dark)" }}>Subtotal {label}</td>
                      <td className="py-2 px-3 text-right font-bold" style={{ color: "var(--terra-dark)" }}>${fmtDec(sub)}</td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        <div
          className="mt-4 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          style={{ background: "var(--ink)", color: "var(--cream)" }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Total recursos tangibles (suma de ítems)</span>
          <span className="font-serif text-2xl">${fmtDec(totalT)}</span>
        </div>
      </Card>

      <Card>
        <CardTitle>Recursos intangibles</CardTitle>
        <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
          Software, conocimiento técnico, licencias y procesos estandarizados.
        </p>
        {CAT_I.map(({ id: cat, label }) => {
          const rows = recursosIntangibles.filter((r) => r.categoria === cat);
          const sub = sumBy(rows);
          return (
            <div key={cat} className="mb-8 last:mb-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold" style={{ color: "var(--ink)" }}>{label}</h3>
                <Button variant="outline" className="!py-1 !px-2 !text-xs" onClick={() => addRecursoIntangible(cat)}>
                  + Ítem
                </Button>
              </div>
              <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-white" style={{ borderColor: "var(--border)" }}>
                      <th className="text-left py-2 px-3 text-xs font-semibold uppercase" style={{ color: "var(--muted)" }}>Concepto</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold uppercase w-36" style={{ color: "var(--muted)" }}>Costo ($)</th>
                      <th className="w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} className="border-b" style={{ borderColor: "var(--border)" }}>
                        <td className="py-2 px-2">
                          <Input value={r.nombre} onChange={(v) => updateRecursoIntangible(r.id, "nombre", v)} placeholder="Descripción" />
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            value={r.costo || ""}
                            onChange={(v) => updateRecursoIntangible(r.id, "costo", parseFloat(v) || 0)}
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <button
                            type="button"
                            className="text-xs font-semibold px-1"
                            style={{ color: "#c0392b" }}
                            onClick={() => removeRecursoIntangible(r.id)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr style={{ background: "#E8F2EC" }}>
                      <td className="py-2 px-3 font-semibold text-xs" style={{ color: "var(--forest)" }}>Subtotal {label}</td>
                      <td className="py-2 px-3 text-right font-bold" style={{ color: "var(--forest)" }}>${fmtDec(sub)}</td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        <div
          className="mt-4 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          style={{ background: "var(--forest)", color: "#fff" }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider opacity-90">Total recursos intangibles (suma de ítems)</span>
          <span className="font-serif text-2xl">${fmtDec(totalI)}</span>
        </div>
      </Card>

      <div className="flex gap-3 flex-wrap">
        <Button variant="terra" onClick={() => setTab("resumen")}>Ver resumen de costos →</Button>
        <Button variant="outline" onClick={() => setTab("nomina")}>Nómina</Button>
        <Button variant="outline" onClick={() => setTab("empaque")}>← Empaque</Button>
      </div>
    </div>
  );
}
