"use client";

import { useStore } from "@/store/useStore";
import { Card, CardTitle, Button, FieldLabel, Input, Textarea, SectionHeader } from "@/components/ui";
import type { FichaTecnica } from "@/types";

const CAMPOS_CORTOS: { key: keyof FichaTecnica; label: string }[] = [
  { key: "producto", label: "Producto" },
  { key: "fabricante", label: "Fabricante" },
  { key: "modelo", label: "Modelo" },
  { key: "marca", label: "Marca" },
  { key: "presentacion", label: "Presentación" },
];

const CAMPOS_LARGOS: { key: keyof FichaTecnica; label: string; rows: number }[] = [
  { key: "descripcionProducto", label: "Descripción del producto", rows: 4 },
  { key: "especificacionesTecnicas", label: "Especificaciones técnicas", rows: 8 },
  { key: "instruccionesUso", label: "Instrucciones de uso", rows: 4 },
];

const DOS_COLUMNAS: { key: keyof FichaTecnica; label: string; rows: number }[] = [
  { key: "beneficios", label: "Beneficios", rows: 6 },
  { key: "advertencias", label: "Advertencias", rows: 6 },
];

const COMPOSICION_EMPAQUE: { key: keyof FichaTecnica; label: string; rows: number }[] = [
  { key: "composicion", label: "Composición", rows: 8 },
  { key: "empaque", label: "Empaque", rows: 6 },
];

const PIE: { key: keyof FichaTecnica; label: string }[] = [
  { key: "rotulado", label: "Rotulado" },
  { key: "lugarElaboracion", label: "Lugar de elaboración" },
  { key: "fechaElaboracion", label: "Fecha de elaboración" },
  { key: "unidadVenta", label: "Unidad de venta" },
];

export default function TabFichaTecnica() {
  const { fichaTecnica, updateFichaTecnica, setTab } = useStore();

  const setField = (key: keyof FichaTecnica, value: string) => updateFichaTecnica(key, value);

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Ficha técnica"
        sub="Documento de identificación del producto según la hoja «Ficha tecnica» del estudio. Edita los campos y usa imprimir para PDF."
      />

      <Card>
        <CardTitle>Identificación</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAMPOS_CORTOS.map(({ key, label }) => (
            <div key={key}>
              <FieldLabel>{label}</FieldLabel>
              <Input value={fichaTecnica[key]} onChange={(v) => setField(key, v)} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Descripción y especificaciones</CardTitle>
        <div className="space-y-4">
          {CAMPOS_LARGOS.map(({ key, label, rows }) => (
            <div key={key}>
              <FieldLabel>{label}</FieldLabel>
              <Textarea value={fichaTecnica[key]} onChange={(v) => setField(key, v)} rows={rows} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Beneficios y advertencias</CardTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {DOS_COLUMNAS.map(({ key, label, rows }) => (
            <div key={key}>
              <FieldLabel>{label}</FieldLabel>
              <Textarea value={fichaTecnica[key]} onChange={(v) => setField(key, v)} rows={rows} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Composición y empaque</CardTitle>
        <div className="space-y-4">
          {COMPOSICION_EMPAQUE.map(({ key, label, rows }) => (
            <div key={key}>
              <FieldLabel>{label}</FieldLabel>
              <Textarea value={fichaTecnica[key]} onChange={(v) => setField(key, v)} rows={rows} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Rotulado, origen y venta</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PIE.map(({ key, label }) => (
            <div key={key} className={key === "rotulado" || key === "lugarElaboracion" ? "sm:col-span-2" : ""}>
              <FieldLabel>{label}</FieldLabel>
              <Textarea
                value={fichaTecnica[key]}
                onChange={(v) => setField(key, v)}
                rows={key === "rotulado" || key === "lugarElaboracion" ? 4 : 2}
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3 flex-wrap no-print">
        <Button variant="terra" onClick={() => window.print()}>Imprimir / PDF</Button>
        <Button variant="outline" onClick={() => setTab("materias")}>Materias primas →</Button>
      </div>
    </div>
  );
}
