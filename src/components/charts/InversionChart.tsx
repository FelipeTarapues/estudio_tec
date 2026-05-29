"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Row = { categoria: string; valor: number };

const COLORS = ["var(--terra)", "var(--forest)", "var(--gold)", "#9c5eb8", "#5d8a6f"];

export function InversionChart({ data, title }: { data: Row[]; title: string }) {
  const filtered = data.filter((d) => d.valor > 0);
  if (filtered.length === 0) {
    return (
      <p className="text-sm text-center py-10" style={{ color: "var(--muted)" }}>
        Sin ítems en {title}
      </p>
    );
  }

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filtered} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="categoria"
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-12}
            textAnchor="end"
            height={52}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Tooltip
            formatter={(value) => [
              `$${Number(value ?? 0).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`,
              title,
            ]}
            contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
          />
          <Bar dataKey="valor" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {filtered.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
