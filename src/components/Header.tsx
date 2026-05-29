"use client";
import { useStore } from "@/store/useStore";
import { costoTotalProducto } from "@/lib/costos";

export default function Header() {
  const { nombreProducto, masaTotal, unidadMasa, materias, empaques } = useStore();
  const { porUnidad } = costoTotalProducto(materias, empaques, masaTotal);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10">
      <div
        className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, #1a1612 0%, var(--ink) 50%, #2a2420 100%)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center shrink-0 text-lg"
            style={{ background: "linear-gradient(135deg, var(--terra) 0%, var(--terra-dark) 100%)" }}
            aria-hidden
          >
            🍦
          </div>
          <div className="min-w-0">
            <span className="font-serif text-xl sm:text-2xl tracking-tight block leading-tight" style={{ color: "var(--cream)" }}>
              Estudio<span style={{ color: "var(--terra-light)" }}>Téc</span>
            </span>
            <span className="hidden md:block text-xs truncate mt-0.5" style={{ color: "rgba(247, 243, 238, 0.55)" }}>
              {nombreProducto}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            className="hidden lg:flex flex-col items-end px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--terra-light)" }}>
              Costo / unidad
            </span>
            <span className="text-sm font-bold tabular-nums" style={{ color: "#fff" }}>
              ${porUnidad.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
            </span>
          </div>
          <span
            className="text-[11px] font-semibold px-3 py-1.5 rounded-full tabular-nums"
            style={{ background: "rgba(196, 113, 74, 0.2)", color: "var(--terra-light)", border: "1px solid rgba(232, 149, 106, 0.25)" }}
          >
            {masaTotal} {unidadMasa}
          </span>
        </div>
      </div>
    </header>
  );
}
