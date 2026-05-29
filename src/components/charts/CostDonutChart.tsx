"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Slice = { name: string; value: number; color: string };

export function CostDonutChart({ data, total }: { data: Slice[]; total: number }) {
  const filtered = data.filter((d) => d.value > 0);
  if (filtered.length === 0) {
    return (
      <p className="text-sm text-center py-12" style={{ color: "var(--muted)" }}>
        Sin datos para graficar
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="relative h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filtered}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              stroke="var(--surface)"
              strokeWidth={2}
            >
              {filtered.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                `$${Number(value ?? 0).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`
              }
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                zIndex: 50,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <div className="text-center px-2 max-w-[120px]">
            <p
              className="text-[10px] uppercase tracking-widest font-semibold mb-0.5"
              style={{ color: "var(--muted)" }}
            >
              Total
            </p>
            <p className="font-serif text-lg sm:text-xl leading-tight tabular-nums" style={{ color: "var(--ink)" }}>
              ${total.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
