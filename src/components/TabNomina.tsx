"use client";

import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { Card, CardTitle, Input, SectionHeader, Button, FieldLabel, fmtDec } from "@/components/ui";
import {
  auxilioEfectivo,
  netoPagado,
  pensionEmpleado,
  salarioDevengadoCalculado,
  saludEmpleado,
  totalDevengado,
} from "@/lib/nomina";
import { FORMULAS } from "@/lib/formulas";
import { NominaStackChart } from "@/components/charts/NominaStackChart";
import type { EmpleadoNomina } from "@/types";

function num(v: string) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

export default function TabNomina() {
  const {
    parametrosNomina,
    empleadosNomina,
    setParametrosNomina,
    updateEmpleadoNomina,
    removeEmpleadoNomina,
    addEmpleadoNomina,
    setTab,
  } = useStore();

  const p = parametrosNomina;

  const totales = useMemo(() => {
    let td = 0;
    let salud = 0;
    let pension = 0;
    let neto = 0;
    let sena = 0;
    let icbf = 0;
    let caja = 0;
    let saludEmp = 0;
    let fondo = 0;
    let ret = 0;
    let otras = 0;
    for (const e of empleadosNomina) {
      td += totalDevengado(e, p);
      salud += saludEmpleado(e, p);
      pension += pensionEmpleado(e, p);
      neto += netoPagado(e, p);
      fondo += e.fondoSolidaridad;
      ret += e.retencionFuente;
      otras += e.otrasDeducciones;
      sena += e.sena ?? 0;
      icbf += e.icbf ?? 0;
      caja += e.cajaCompensacion ?? 0;
      saludEmp += e.aporteSaludEmpleador ?? 0;
    }
    return { td, salud, pension, neto, sena, icbf, caja, saludEmp, fondo, ret, otras };
  }, [empleadosNomina, p]);

  const nominaChartRows = useMemo(
    () =>
      empleadosNomina.map((e) => ({
        nombre: e.rol,
        devengado: totalDevengado(e, p),
        deducciones:
          saludEmpleado(e, p) +
          pensionEmpleado(e, p) +
          e.fondoSolidaridad +
          e.retencionFuente +
          e.otrasDeducciones,
        neto: netoPagado(e, p),
      })),
    [empleadosNomina, p],
  );

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Cálculo de nómina"
        sub="Liquidación mensual: devengados, deducciones (salud y pensión sobre base sin auxilio de transporte) y neto. Datos iniciales desde la hoja «Calculo de nomina»."
      />

      <Card>
        <CardTitle formula={FORMULAS.totalDevengado}>Panorama de la nómina</CardTitle>
        <NominaStackChart data={nominaChartRows} />
        <p className="text-xs text-center mt-3" style={{ color: "var(--muted)" }}>
          Comparación agregada: devengado vs deducciones del empleado vs neto pagado
        </p>
      </Card>

      <Card>
        <CardTitle>Valores de referencia</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <FieldLabel>Salario mínimo legal (mensual)</FieldLabel>
            <Input
              type="number"
              min={0}
              step={1}
              value={p.salarioMinimoLegal}
              onChange={(v) => setParametrosNomina({ salarioMinimoLegal: num(v) })}
            />
          </div>
          <div>
            <FieldLabel>Auxilio de transporte (mensual)</FieldLabel>
            <Input
              type="number"
              min={0}
              step={1}
              value={p.auxilioTransporte}
              onChange={(v) => setParametrosNomina({ auxilioTransporte: num(v) })}
            />
          </div>
          <div>
            <FieldLabel formula={FORMULAS.saludPension}>Salud empleado (ej. 0,04)</FieldLabel>
            <Input
              type="number"
              min={0}
              step={0.001}
              value={p.porcentajeSalud}
              onChange={(v) => setParametrosNomina({ porcentajeSalud: num(v) })}
            />
          </div>
          <div>
            <FieldLabel>Pensión empleado (ej. 0,04)</FieldLabel>
            <Input
              type="number"
              min={0}
              step={0.001}
              value={p.porcentajePension}
              onChange={(v) => setParametrosNomina({ porcentajePension: num(v) })}
            />
          </div>
        </div>
        <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
          Salario devengado = (salario básico ÷ 30) × días liquidados. Salud y pensión se calculan sobre devengado + extras + recargos (sin auxilio de transporte). Auxilio automático si el básico no supera 2× el SMMLV.
        </p>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <CardTitle formula={FORMULAS.netoPagado}>Liquidación por empleado</CardTitle>
          <Button variant="terra" onClick={addEmpleadoNomina}>
            + Agregar fila
          </Button>
        </div>

        <div className="overflow-x-auto -mx-2 px-2 pb-2" style={{ maxWidth: "100%" }}>
          <table className="w-full text-xs border-collapse min-w-[1100px]">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                {[
                  "Rol / actividad",
                  "Salario básico",
                  "Días",
                  "Sal. devengado",
                  "H. extras",
                  "Rec. noct.",
                  "Dom/fest.",
                  "Aux. auto",
                  "Auxilio $",
                  "Total devengado",
                  "Salud",
                  "Pensión",
                  "FSP",
                  "Retefuente",
                  "Otras",
                  "Neto pagado",
                  "Empresa",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2 px-1.5 font-semibold uppercase tracking-wider whitespace-nowrap"
                    style={{ color: "var(--muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empleadosNomina.map((e) => (
                <FilaNomina
                  key={e.id}
                  e={e}
                  p={p}
                  onChange={updateEmpleadoNomina}
                  onRemove={() => removeEmpleadoNomina(e.id)}
                />
              ))}
              <tr className="font-bold border-t-2" style={{ borderColor: "var(--terra)", background: "var(--warm)" }}>
                <td className="py-2 px-1.5" colSpan={9}>
                  Totales
                </td>
                <td className="py-2 px-1.5 whitespace-nowrap">${fmtDec(totales.td)}</td>
                <td className="py-2 px-1.5 whitespace-nowrap">${fmtDec(totales.salud)}</td>
                <td className="py-2 px-1.5 whitespace-nowrap">${fmtDec(totales.pension)}</td>
                <td className="py-2 px-1.5 whitespace-nowrap">${fmtDec(totales.fondo)}</td>
                <td className="py-2 px-1.5 whitespace-nowrap">${fmtDec(totales.ret)}</td>
                <td className="py-2 px-1.5 whitespace-nowrap">${fmtDec(totales.otras)}</td>
                <td className="py-2 px-1.5 whitespace-nowrap">${fmtDec(totales.neto)}</td>
                <td className="py-2 px-1.5 text-[10px]" style={{ color: "var(--muted)" }}>
                  SENA ${fmtDec(totales.sena)} · ICBF ${fmtDec(totales.icbf)} · Caja ${fmtDec(totales.caja)}
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardTitle>Resumen de totales</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="rounded-lg p-3 border" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs uppercase font-semibold mb-1" style={{ color: "var(--muted)" }}>Total devengado</p>
            <p className="font-serif text-xl">${fmtDec(totales.td)}</p>
          </div>
          <div className="rounded-lg p-3 border" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs uppercase font-semibold mb-1" style={{ color: "var(--muted)" }}>Salud + pensión (empleado)</p>
            <p className="font-serif text-xl">${fmtDec(totales.salud + totales.pension)}</p>
          </div>
          <div className="rounded-lg p-3 border" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs uppercase font-semibold mb-1" style={{ color: "var(--muted)" }}>Neto pagado</p>
            <p className="font-serif text-xl">${fmtDec(totales.neto)}</p>
          </div>
          <div className="rounded-lg p-3 border" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs uppercase font-semibold mb-1" style={{ color: "var(--muted)" }}>Parafiscales (info)</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              SENA ${fmtDec(totales.sena)} · ICBF ${fmtDec(totales.icbf)} · Caja ${fmtDec(totales.caja)}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Aporte salud empleador (registro): ${fmtDec(totales.saludEmp)}
            </p>
          </div>
        </div>
      </Card>

      <div className="flex gap-3 flex-wrap">
        <Button variant="terra" onClick={() => setTab("resumen")}>Ir a resumen →</Button>
        <Button variant="outline" onClick={() => setTab("recursos")}>← Recursos</Button>
      </div>
    </div>
  );
}

function FilaNomina({
  e,
  p,
  onChange,
  onRemove,
}: {
  e: EmpleadoNomina;
  p: import("@/types").ParametrosNomina;
  onChange: (id: string, key: keyof EmpleadoNomina, value: string | number | boolean) => void;
  onRemove: () => void;
}) {
  const td = totalDevengado(e, p);
  const s = saludEmpleado(e, p);
  const pen = pensionEmpleado(e, p);
  const net = netoPagado(e, p);
  const paraf = [e.sena, e.icbf, e.cajaCompensacion].some((x) => x != null && x > 0);

  return (
    <tr className="border-b align-top" style={{ borderColor: "var(--border)" }}>
      <td className="py-1.5 px-1 min-w-[140px]">
        <Input value={e.rol} onChange={(v) => onChange(e.id, "rol", v)} className="!text-xs" />
      </td>
      <td className="py-1.5 px-1 w-[100px]">
        <Input type="number" min={0} step={1} value={e.salarioBasico} onChange={(v) => onChange(e.id, "salarioBasico", num(v))} className="!text-xs" />
      </td>
      <td className="py-1.5 px-1 w-[52px]">
        <Input type="number" min={1} step={1} value={e.diasLiquidados} onChange={(v) => onChange(e.id, "diasLiquidados", num(v))} className="!text-xs" />
      </td>
      <td className="py-1.5 px-1 w-[100px]">
        <span className="inline-block text-xs font-semibold px-1 py-2 tabular-nums" style={{ color: "var(--ink)" }}>
          ${fmtDec(salarioDevengadoCalculado(e))}
        </span>
      </td>
      <td className="py-1.5 px-1 w-[88px]">
        <Input type="number" min={0} step={1} value={e.horasExtras} onChange={(v) => onChange(e.id, "horasExtras", num(v))} className="!text-xs" />
      </td>
      <td className="py-1.5 px-1 w-[88px]">
        <Input type="number" min={0} step={0.01} value={e.recargosNocturnos} onChange={(v) => onChange(e.id, "recargosNocturnos", num(v))} className="!text-xs" />
      </td>
      <td className="py-1.5 px-1 w-[80px]">
        <Input type="number" min={0} step={1} value={e.domFestivo} onChange={(v) => onChange(e.id, "domFestivo", num(v))} className="!text-xs" />
      </td>
      <td className="py-1.5 px-1 w-[52px] text-center">
        <input
          type="checkbox"
          checked={e.auxilioTransporteAuto}
          onChange={(ev) => onChange(e.id, "auxilioTransporteAuto", ev.target.checked)}
          className="w-4 h-4 accent-[var(--terra)]"
        />
      </td>
      <td className="py-1.5 px-1 w-[88px]">
        {e.auxilioTransporteAuto ? (
          <span className="inline-block text-xs font-semibold px-1 py-2" style={{ color: "var(--terra-dark)" }}>
            ${fmtDec(auxilioEfectivo(e, p))}
          </span>
        ) : (
          <Input
            type="number"
            min={0}
            step={1}
            value={e.auxilioTransporteManual}
            onChange={(v) => onChange(e.id, "auxilioTransporteManual", num(v))}
            className="!text-xs"
          />
        )}
      </td>
      <td className="py-2 px-1.5 whitespace-nowrap font-semibold" style={{ color: "var(--ink)" }}>${fmtDec(td)}</td>
      <td className="py-2 px-1.5 whitespace-nowrap" style={{ color: "var(--terra-dark)" }}>${fmtDec(s)}</td>
      <td className="py-2 px-1.5 whitespace-nowrap" style={{ color: "var(--terra-dark)" }}>${fmtDec(pen)}</td>
      <td className="py-1.5 px-1 w-[72px]">
        <Input type="number" min={0} step={1} value={e.fondoSolidaridad} onChange={(v) => onChange(e.id, "fondoSolidaridad", num(v))} className="!text-xs" />
      </td>
      <td className="py-1.5 px-1 w-[80px]">
        <Input type="number" min={0} step={1} value={e.retencionFuente} onChange={(v) => onChange(e.id, "retencionFuente", num(v))} className="!text-xs" />
      </td>
      <td className="py-1.5 px-1 w-[72px]">
        <Input type="number" min={0} step={1} value={e.otrasDeducciones} onChange={(v) => onChange(e.id, "otrasDeducciones", num(v))} className="!text-xs" />
      </td>
      <td className="py-2 px-1.5 whitespace-nowrap font-bold" style={{ color: "var(--forest)" }}>${fmtDec(net)}</td>
      <td className="py-1.5 px-1 text-[10px] max-w-[120px]" style={{ color: "var(--muted)" }}>
        {paraf ? (
          <>
            SENA {e.sena != null ? `$${fmtDec(e.sena)}` : "—"}
            <br />
            ICBF {e.icbf != null ? `$${fmtDec(e.icbf)}` : "—"}
            <br />
            Caja {e.cajaCompensacion != null ? `$${fmtDec(e.cajaCompensacion)}` : "—"}
          </>
        ) : (
          "—"
        )}
      </td>
      <td className="py-1.5 px-1">
        <button type="button" className="text-[10px] font-semibold" style={{ color: "#c0392b" }} onClick={onRemove}>
          ✕
        </button>
      </td>
    </tr>
  );
}
