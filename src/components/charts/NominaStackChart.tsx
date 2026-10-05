"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
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

  // Filtrar filas con valores inválidos y limitar a los 10 con mayor devengado para que el gráfico sea legible
  const cleaned = data
    .map((r) => ({
      nombre: r.nombre?.trim() ? r.nombre : "Sin nombre",
      devengado: Number(r.devengado) || 0,
      deducciones: Number(r.deducciones) || 0,
      neto: Number(r.neto) || 0,
    }))
    .filter((r) => r.devengado > 0 || r.neto > 0)
    .sort((a, b) => b.devengado - a.devengado);

  if (cleaned.length === 0) {
    return (
      <p className="text-sm text-center py-10" style={{ color: "var(--muted)" }}>
        Sin datos para graficar (valores en cero)
      </p>
    );
  }

  // Vista agregada (totales) — una sola barra apilada Neto + Deducciones = Devengado
  const agg = [
    {
      concepto: "Nómina total",
      Neto: cleaned.reduce((a, r) => a + r.neto, 0),
      Deducciones: cleaned.reduce((a, r) => a + r.deducciones, 0),
    },
  ];

  // Vista por empleado (top 8) para detalle — usa nombres completos sin truncar y ancho suficiente para que no queden pegadas
  const perEmpleado = cleaned.slice(0, 8).map((r) => ({
    name: r.nombre,
    full: r.nombre,
    Neto: r.neto,
    Deducciones: r.deducciones,
  }));

  const usePerEmpleado = cleaned.length > 1;
  const detalleHeight = Math.max(320, perEmpleado.length * 44 + 72);

  return (
    <div className="w-full space-y-6">
      {/* Gráfica agregada apilada */}
      <div className="h-[270px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={agg} margin={{ top: 16, right: 16, left: 12, bottom: 8 }} barCategoryGap="32%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="concepto" tick={{ fontSize: 12, fill: "#7a6e65" }} axisLine={false} tickLine={false} dy={8} />
            <YAxis
              tick={{ fontSize: 11, fill: "#7a6e65" }}
              tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip
              formatter={(value) => `$${Number(value ?? 0).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`}
              contentStyle={{ borderRadius: 12, border: "1px solid #ddd5c8", fontSize: 12 }}
              cursor={{ fill: "rgba(196,113,74,0.06)" }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Bar dataKey="Neto" stackId="nomina" fill="#3a5c4a" radius={[0, 0, 0, 0]} barSize={48} />
            <Bar dataKey="Deducciones" stackId="nomina" fill="#c0392b" radius={[6, 6, 0, 0]} barSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detalle por empleado cuando hay más de uno */}
      {usePerEmpleado && (
        <div className="w-full" style={{ height: detalleHeight }}>
          <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>
            Detalle por empleado (top {perEmpleado.length})
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={perEmpleado} layout="vertical" margin={{ top: 4, right: 24, left: 16, bottom: 16 }} barCategoryGap="22%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#7a6e65" }}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={182}
                tick={{ fontSize: 11, fill: "#1e1a16" }}
                axisLine={false}
                tickLine={false}
                interval={0}
                tickMargin={12}
              />
              <Tooltip
                labelFormatter={(_, payload) => payload?.[0]?.payload?.full ?? ""}
                formatter={(value, name) => [`$${Number(value ?? 0).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`, name]}
                contentStyle={{ borderRadius: 12, border: "1px solid #ddd5c8", fontSize: 12 }}
                cursor={{ fill: "rgba(196,113,74,0.04)" }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} verticalAlign="bottom" align="center" />
              <Bar dataKey="Neto" stackId="emp" fill="#3a5c4a" radius={[0, 0, 0, 0]} maxBarSize={26} />
              <Bar dataKey="Deducciones" stackId="emp" fill="#c0392b" radius={[0, 6, 6, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
