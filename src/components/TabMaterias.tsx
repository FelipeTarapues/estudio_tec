"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { costoFabricacion, costoLineaMateria } from "@/lib/costos";
import { FORMULAS } from "@/lib/formulas";
import { Card, CardTitle, Input, SectionHeader, Button, FieldLabel, Select, fmtDec } from "@/components/ui";
import type { Tab } from "@/types";

const UNIDADES = [
  { value: "Litros",     label: "Litros" },
  { value: "Kilogramos", label: "Kilogramos" },
  { value: "Tonelada",   label: "Tonelada" },
  { value: "ml",         label: "ml" },
  { value: "Gramos",     label: "Gramos" },
  { value: "Unidad",     label: "Unidad" },
];

export default function TabMaterias() {
  const {
    nombreProducto, masaTotal, unidadMasa,
    materias, densidadLeche, densidadCrema,
    setField, addMateria, updateMateria, removeMateria, setTab,
  } = useStore();
  const router = useRouter();
  const go = (t: Tab) => { setTab(t); router.push(`/${t}`); };

  const totalFabricacion = costoFabricacion(materias);

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Materias Primas"
        sub="Cantidades para el lote completo (ej. 200 unidades). El costo unitario se interpreta desde la descripción cuando dice «$X por litro» o «costo por 0,75 L»."
      />

      {/* Configuración del producto */}
      <Card>
        <CardTitle>Configuración General</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <FieldLabel>Nombre del Producto</FieldLabel>
            <Input value={nombreProducto} onChange={(v) => setField("nombreProducto", v)} placeholder="Ej: Postre Lácteo" />
          </div>
          <div>
            <FieldLabel formula={FORMULAS.costoTotalProducto}>Masa Total de Producción</FieldLabel>
            <Input type="number" value={masaTotal} onChange={(v) => setField("masaTotal", parseFloat(v) || 0)} min={1} />
          </div>
          <div>
            <FieldLabel>Unidad</FieldLabel>
            <Select
              value={unidadMasa}
              onChange={(v) => setField("unidadMasa", v)}
              options={[
                { value: "unidades", label: "Unidades" },
                { value: "kg",       label: "Kilogramos" },
                { value: "litros",   label: "Litros" },
                { value: "porciones",label: "Porciones" },
              ]}
            />
          </div>
        </div>

        {/* Densidades auxiliares */}
        <div className="mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ borderColor: "var(--border)" }}>
          <div>
            <FieldLabel>Densidad de la leche (kg/l)</FieldLabel>
            <Input type="number" value={densidadLeche} step={0.001} onChange={(v) => setField("densidadLeche", parseFloat(v) || 0)} />
          </div>
          <div>
            <FieldLabel>Densidad de la crema (kg/l)</FieldLabel>
            <Input type="number" value={densidadCrema} step={0.001} onChange={(v) => setField("densidadCrema", parseFloat(v) || 0)} />
          </div>
        </div>
      </Card>

      {/* Tabla de materias primas */}
      <Card>
        <CardTitle formula={FORMULAS.costoLineaMateria}>Tabla de Materias Primas</CardTitle>

        {/* Encabezado */}
        <div
          className="hidden md:grid gap-2 px-2 pb-2 mb-1 text-xs font-semibold uppercase tracking-wider border-b"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1.5fr 1.2fr 1fr 0.4fr", color: "var(--muted)", borderColor: "var(--border)" }}
        >
          <span>Materia Prima</span>
          <span>Unidad de medida</span>
          <span>Cantidad requerida</span>
          <span>Descripción de costo</span>
          <span>Costo unitario ($)</span>
          <span>Costo total ($)</span>
          <span />
        </div>

        <div className="space-y-1">
          {materias.map((m) => {
            const costoTotal = costoLineaMateria(m);
            return (
              <div
                key={m.id}
                className="grid gap-2 px-2 py-2 rounded-lg items-center transition-colors hover:bg-cream"
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1.5fr 1.2fr 1fr 0.4fr" }}
              >
                <Input value={m.nombre} onChange={(v) => updateMateria(m.id, "nombre", v)} placeholder="Nombre ingrediente" />
                <Select
                  value={m.unidad}
                  onChange={(v) => updateMateria(m.id, "unidad", v)}
                  options={UNIDADES}
                />
                <Input
                  type="number" value={m.cantidadRequerida} step={0.01} min={0}
                  onChange={(v) => updateMateria(m.id, "cantidadRequerida", parseFloat(v) || 0)}
                />
                <Input
                  value={m.descripcionCosto}
                  onChange={(v) => updateMateria(m.id, "descripcionCosto", v)}
                  placeholder="Ej: Costo por kg"
                />
                <Input
                  type="number" value={m.costoUnitario} step={0.01} min={0}
                  onChange={(v) => updateMateria(m.id, "costoUnitario", parseFloat(v) || 0)}
                />
                <span
                  className="inline-block px-3 py-1.5 rounded-lg text-sm font-semibold text-center"
                  style={{ background: "var(--warm)", color: "var(--terra-dark)" }}
                >
                  ${fmtDec(costoTotal)}
                </span>
                <button
                  onClick={() => removeMateria(m.id)}
                  className="text-xs px-2 py-1 rounded-lg border cursor-pointer transition-colors"
                  style={{ borderColor: "#e0bcb8", color: "#c0392b", background: "none" }}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {materias.length === 0 && (
          <p className="text-center py-8 text-sm" style={{ color: "var(--muted)" }}>Sin materias primas. Agrega una.</p>
        )}

        {/* Fila masa total */}
        <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-4">
            <span
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: "#90ee90", color: "#1a5c1a" }}
            >
              Masa total del postre: {masaTotal} {unidadMasa}
            </span>
          </div>
          <span
            className="px-5 py-2 rounded-lg text-sm font-bold"
            style={{ background: "var(--terra)", color: "#fff" }}
          >
            Costo de fabricación: ${fmtDec(totalFabricacion)}
          </span>
        </div>

        <div className="flex gap-3 mt-4 flex-wrap">
          <Button variant="outline" onClick={addMateria}>+ Agregar Materia Prima</Button>
          <Button variant="forest" onClick={() => go("empaque")}>Siguiente → Empaque ›</Button>
        </div>
      </Card>
    </div>
  );
}
