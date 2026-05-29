"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Row = { nombre: string; costo: number };

export function InsumosBarChart({ data }: { data: Row[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-center py-12" style={{ color: "var(--muted)" }}>
        Agrega materias primas para ver el gráfico
      </p>
    );
  }

  const chartData = data.map((d) => ({
    name: d.nombre.length > 18 ? `${d.nombre.slice(0, 16)}…` : d.nombre,
    costo: d.costo,
    full: d.nombre,
  }));

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 4, right: 12, top: 4, bottom: 4 }}>
          <XAxis
            type="number"
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fontSize: 10, fill: "var(--ink)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [
              `$${Number(value ?? 0).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`,
              "Costo",
            ]}
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.full ?? ""
            }
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--border)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="costo" fill="var(--terra)" radius={[0, 6, 6, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
