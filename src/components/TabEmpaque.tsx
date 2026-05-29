"use client";
import { useStore } from "@/store/useStore";
import {
  costoEmbalaje,
  costoLineaEmpaque,
  costoUnitarioEmpaque,
  unidadesPorPaquete,
} from "@/lib/costos";
import { FORMULAS } from "@/lib/formulas";
import { Card, CardTitle, Input, SectionHeader, Button, Select, fmtDec } from "@/components/ui";

const UNIDADES = [
  { value: "Unidad",     label: "Unidad" },
  { value: "Kilogramos", label: "Kilogramos" },
  { value: "Litros",     label: "Litros" },
  { value: "Caja",       label: "Caja" },
  { value: "Rollo",      label: "Rollo" },
];

function syncCostoUnitario(
  precioGeneral: number,
  descripcionCosto: string,
  actual: number,
): number {
  const u = unidadesPorPaquete(descripcionCosto);
  if (u && u > 0 && precioGeneral > 0) return precioGeneral / u;
  return actual;
}

export default function TabEmpaque() {
  const { empaques, masaTotal, addEmpaque, updateEmpaque, removeEmpaque, setTab } = useStore();

  const totalEmbalaje = costoEmbalaje(empaques, masaTotal);

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Materiales de Empaque"
        sub={`Costo por unidad de producto × ${masaTotal} unidades de producción. El costo unitario se calcula del precio del paquete y la descripción (ej. «100 por caja»).`}
      />

      <Card>
        <CardTitle formula={FORMULAS.costoLineaEmpaque}>Tabla de Materiales de Empaque</CardTitle>

        <div
          className="hidden md:grid gap-2 px-2 pb-2 mb-1 text-xs font-semibold uppercase tracking-wider border-b"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1.2fr 1.5fr 1fr 1fr 0.4fr", color: "var(--muted)", borderColor: "var(--border)" }}
        >
          <span>Material de Empaque</span>
          <span>Unidad de medida</span>
          <span>Cant. por unidad prod.</span>
          <span>Precio general ($)</span>
          <span>Descripción del costo</span>
          <span>Costo unitario ($)</span>
          <span>Costo lote ($)</span>
          <span />
        </div>

        <div className="space-y-1">
          {empaques.map((e) => {
            const unitario = costoUnitarioEmpaque(e);
            const costoLote = costoLineaEmpaque(e, masaTotal);
            return (
              <div
                key={e.id}
                className="grid gap-2 px-2 py-2 rounded-lg items-center transition-colors hover:bg-cream"
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1.2fr 1.5fr 1fr 1fr 0.4fr" }}
              >
                <Input value={e.nombre} onChange={(v) => updateEmpaque(e.id, "nombre", v)} placeholder="Nombre del material" />
                <Select value={e.unidad} onChange={(v) => updateEmpaque(e.id, "unidad", v)} options={UNIDADES} />
                <Input
                  type="number" value={e.cantidadRequerida} step={1} min={0}
                  onChange={(v) => updateEmpaque(e.id, "cantidadRequerida", parseFloat(v) || 0)}
                />
                <Input
                  type="number" value={e.precioGeneral} step={100} min={0}
                  onChange={(v) => {
                    const precio = parseFloat(v) || 0;
                    updateEmpaque(e.id, "precioGeneral", precio);
                    const cu = syncCostoUnitario(precio, e.descripcionCosto, e.costoUnitario);
                    if (cu !== e.costoUnitario) updateEmpaque(e.id, "costoUnitario", cu);
                  }}
                />
                <Input
                  value={e.descripcionCosto}
                  onChange={(v) => {
                    updateEmpaque(e.id, "descripcionCosto", v);
                    const cu = syncCostoUnitario(e.precioGeneral, v, e.costoUnitario);
                    if (cu !== e.costoUnitario) updateEmpaque(e.id, "costoUnitario", cu);
                  }}
                  placeholder="Ej: 100 por caja"
                />
                <span
                  className="inline-block px-2 py-1.5 rounded-lg text-sm font-semibold text-center tabular-nums"
                  style={{ background: "#f3e5f5", color: "#7b1fa2" }}
                  title="Precio del paquete ÷ unidades por paquete"
                >
                  ${fmtDec(unitario)}
                </span>
                <span
                  className="inline-block px-2 py-1.5 rounded-lg text-sm font-bold text-center tabular-nums"
                  style={{ background: "#fdf4ff", color: "#7b1fa2" }}
                >
                  ${fmtDec(costoLote)}
                </span>
                <button
                  onClick={() => removeEmpaque(e.id)}
                  className="text-xs px-2 py-1 rounded-lg border cursor-pointer"
                  style={{ borderColor: "#e0bcb8", color: "#c0392b", background: "none" }}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {empaques.length === 0 && (
          <p className="text-center py-8 text-sm" style={{ color: "var(--muted)" }}>Sin materiales. Agrega uno.</p>
        )}

        <div className="mt-4 pt-3 border-t flex justify-end" style={{ borderColor: "var(--border)" }}>
          <span
            className="px-5 py-2 rounded-lg text-sm font-bold"
            style={{ background: "#e040fb22", color: "#7b1fa2", border: "2px solid #e040fb55" }}
          >
            Costo de embalaje ({masaTotal} uds.): ${fmtDec(totalEmbalaje)}
          </span>
        </div>

        <div className="flex gap-3 mt-4 flex-wrap">
          <Button variant="outline" onClick={addEmpaque}>+ Agregar Material</Button>
          <Button variant="forest" onClick={() => setTab("resumen")}>Ver Resumen de Costos →</Button>
        </div>
      </Card>
    </div>
  );
}
