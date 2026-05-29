"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Row = { nombre: string; devengado: number; deducciones: number; neto: number };

export function NominaStackChart({ data }: { data: Row[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-center py-10" style={{ color: "var(--muted)" }}>
        Sin empleados registrados
      </p>
    );
  }

  const agg = [
    {
      concepto: "Nómina",
      Devengado: data.reduce((a, r) => a + r.devengado, 0),
      Deducciones: data.reduce((a, r) => a + r.deducciones, 0),
      Neto: data.reduce((a, r) => a + r.neto, 0),
    },
  ];

  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={agg} margin={{ top: 12, right: 12, left: 8, bottom: 4 }}>
          <XAxis dataKey="concepto" tick={{ fontSize: 11, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value) =>
              `$${Number(value ?? 0).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`
            }
            contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="Devengado" fill="var(--terra)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Deducciones" fill="#c0392b" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Neto" fill="var(--forest)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
