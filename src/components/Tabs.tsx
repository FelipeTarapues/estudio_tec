"use client";
import { useStore } from "@/store/useStore";
import type { Tab } from "@/types";

const TABS: { id: Tab; label: string; short: string }[] = [
  { id: "ficha", label: "Ficha técnica", short: "①" },
  { id: "materias", label: "Materias primas", short: "②" },
  { id: "empaque", label: "Empaque", short: "③" },
  { id: "recursos", label: "Recursos T/I", short: "④" },
  { id: "nomina", label: "Nómina", short: "⑤" },
  { id: "resumen", label: "Resumen", short: "⑥" },
  { id: "proyecciones", label: "Proyecciones", short: "⑦" },
];

export default function Tabs() {
  const { activeTab, setTab } = useStore();
  return (
    <nav className="sticky top-[57px] z-40 px-4 sm:px-6 py-3 border-b" style={{ background: "rgba(247, 243, 238, 0.85)", backdropFilter: "blur(10px)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
        {TABS.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
              style={{
                fontFamily: "var(--font-sans)",
                color: active ? "#fff" : "var(--muted)",
                background: active
                  ? "linear-gradient(135deg, var(--terra) 0%, var(--terra-dark) 100%)"
                  : "transparent",
                boxShadow: active ? "var(--shadow-sm)" : "none",
              }}
            >
              <span className="opacity-70 mr-1">{t.short}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
