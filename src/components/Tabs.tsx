"use client";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import type { Tab } from "@/types";

const TABS: { id: Tab; label: string; short: string; href: string }[] = [
  { id: "ficha", label: "Ficha técnica", short: "①", href: "/ficha" },
  { id: "materias", label: "Materias primas", short: "②", href: "/materias" },
  { id: "empaque", label: "Empaque", short: "③", href: "/empaque" },
  { id: "recursos", label: "Recursos T/I", short: "④", href: "/recursos" },
  { id: "nomina", label: "Nómina", short: "⑤", href: "/nomina" },
  { id: "resumen", label: "Resumen", short: "⑥", href: "/resumen" },
  { id: "proyecciones", label: "Proyecciones", short: "⑦", href: "/proyecciones" },
];

export default function Tabs() {
  const pathname = usePathname();
  const router = useRouter();
  const setTab = useStore((s) => s.setTab);

  const isActive = (href: string) => pathname === href || (pathname === "/" && href === "/ficha");

  return (
    <nav className="sticky top-[57px] z-40 px-4 sm:px-6 py-3 border-b" style={{ background: "rgba(247, 243, 238, 0.85)", backdropFilter: "blur(10px)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
        {TABS.map((t) => {
          const active = isActive(t.href);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                if (!active) {
                  setTab(t.id);
                  router.push(t.href);
                }
              }}
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
