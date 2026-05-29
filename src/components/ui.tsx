import React from "react";
import { FormulaTip } from "@/components/FormulaTip";

export function Card({
  children,
  className = "",
  glass = true,
}: {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}) {
  return (
    <div
      className={`p-6 mb-5 ${glass ? "glass-card" : "rounded-xl border bg-white"} ${className}`}
      style={glass ? undefined : { borderColor: "var(--border)" }}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  formula,
}: {
  children: React.ReactNode;
  formula?: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span
        className="text-[11px] font-bold tracking-[0.12em] uppercase shrink-0"
        style={{ color: "var(--terra)" }}
      >
        {children}
      </span>
      {formula && <FormulaTip formula={formula} title="Cómo se calcula" />}
      <span className="flex-1 h-px opacity-60" style={{ background: "var(--border)" }} />
    </div>
  );
}

export function FieldLabel({
  children,
  formula,
}: {
  children: React.ReactNode;
  formula?: string;
}) {
  return (
    <label
      className="flex items-center gap-0.5 text-[11px] font-semibold uppercase tracking-wide mb-1.5"
      style={{ color: "var(--muted)" }}
    >
      {children}
      {formula && <FormulaTip formula={formula} />}
    </label>
  );
}

export function KpiCard({
  label,
  value,
  sub,
  accent,
  bg,
  formula,
}: {
  label: string;
  value: string;
  sub: string;
  accent: string;
  bg: string;
  formula?: string;
}) {
  return (
    <div className="kpi-card p-5 relative overflow-visible" style={{ background: bg, borderColor: `${accent}33` }}>
      <div className="absolute top-0 left-0 w-1 h-full rounded-full" style={{ background: accent }} />
      <div className="flex items-start justify-between gap-2 pl-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
          {label}
        </p>
        {formula && <FormulaTip formula={formula} />}
      </div>
      <p className="font-serif text-3xl sm:text-4xl leading-none my-2 pl-2" style={{ color: "var(--ink)" }}>
        {value}
      </p>
      <p className="text-xs pl-2" style={{ color: "var(--muted)" }}>
        {sub}
      </p>
    </div>
  );
}

export function Input({
  value,
  onChange,
  type = "text",
  placeholder = "",
  step,
  min,
  className = "",
  disabled = false,
}: {
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  step?: number;
  min?: number;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      step={step}
      min={min}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-all ${className}`}
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        fontFamily: "var(--font-sans)",
        color: "var(--ink)",
        boxShadow: "var(--shadow-sm)",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--terra)";
        e.target.style.boxShadow = "0 0 0 3px rgba(196, 113, 74, 0.15)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "var(--border)";
        e.target.style.boxShadow = "var(--shadow-sm)";
      }}
    />
  );
}

export function Textarea({
  value,
  onChange,
  placeholder = "",
  rows = 4,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-all resize-y min-h-[80px] ${className}`}
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        fontFamily: "var(--font-sans)",
        color: "var(--ink)",
        boxShadow: "var(--shadow-sm)",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--terra)";
        e.target.style.boxShadow = "0 0 0 3px rgba(196, 113, 74, 0.15)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "var(--border)";
        e.target.style.boxShadow = "var(--shadow-sm)";
      }}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2.5 rounded-xl text-sm border outline-none ${className}`}
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        fontFamily: "var(--font-sans)",
        color: "var(--ink)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

type BtnVariant = "terra" | "outline" | "forest" | "danger" | "ghost";
export function Button({
  children,
  onClick,
  variant = "terra",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer";
  const variants: Record<BtnVariant, string> = {
    terra: "text-white shadow-md hover:opacity-95 hover:-translate-y-0.5",
    forest: "text-white shadow-md hover:opacity-95 hover:-translate-y-0.5",
    outline: "border-2 bg-transparent hover:bg-white/80",
    danger: "border bg-transparent",
    ghost: "bg-transparent hover:bg-black/5",
  };
  const styles: Record<BtnVariant, React.CSSProperties> = {
    terra: { background: "linear-gradient(135deg, var(--terra) 0%, var(--terra-dark) 100%)" },
    forest: { background: "linear-gradient(135deg, var(--forest-light) 0%, var(--forest) 100%)" },
    outline: { color: "var(--terra)", borderColor: "var(--terra)" },
    danger: { color: "#c0392b", borderColor: "#e0bcb8" },
    ghost: { color: "var(--muted)" },
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ fontFamily: "var(--font-sans)", ...styles[variant] }}
    >
      {children}
    </button>
  );
}

export function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8 animate-fade-up">
      <h2 className="font-serif text-3xl sm:text-4xl mb-2 tracking-tight" style={{ color: "var(--ink)" }}>
        {title}
      </h2>
      <p className="text-sm max-w-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
        {sub}
      </p>
    </div>
  );
}

export function ChartLegend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="chart-legend">
      {items.map((item) => (
        <span key={item.label} className="chart-legend-item">
          <span className="chart-legend-dot" style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function fmt(n: number): string {
  if (isNaN(n) || !isFinite(n)) return "0";
  return Math.round(n).toLocaleString("es-CO");
}

export function fmtDec(n: number, dec = 2): string {
  if (isNaN(n) || !isFinite(n)) return "0";
  return n.toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
