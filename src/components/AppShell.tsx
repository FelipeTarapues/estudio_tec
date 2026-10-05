"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import { useStore } from "@/store/useStore";
import type { Tab } from "@/types";

const pathToTab: Record<string, Tab> = {
  "/ficha": "ficha",
  "/materias": "materias",
  "/empaque": "empaque",
  "/recursos": "recursos",
  "/nomina": "nomina",
  "/resumen": "resumen",
  "/proyecciones": "proyecciones",
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const loading = useStore((s) => s.loading);
  const error = useStore((s) => s.error);
  const loadFromApi = useStore((s) => s.loadFromApi);
  const setTab = useStore((s) => s.setTab);

  useEffect(() => {
    void loadFromApi();
  }, [loadFromApi]);

  // Sincroniza la ruta con el store (para que botones con setTab y entrada directa por URL coincidan)
  useEffect(() => {
    const tab = pathToTab[pathname];
    if (tab) setTab(tab);
  }, [pathname, setTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "var(--cream)" }}>
        <div className="text-center">
          <p className="font-serif text-xl" style={{ color: "var(--ink)" }}>Cargando estudio técnico...</p>
          <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>Obteniendo datos del backend (api-lite en :9000)</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "var(--cream)" }}>
        <div className="text-center max-w-md glass-card p-6">
          <p className="font-semibold" style={{ color: "#c0392b" }}>No fue posible cargar el estudio</p>
          <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>{error}</p>
          <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>Asegúrate de que el backend esté corriendo: <code>node backend/medusa/api-lite.js</code> (puerto 9000) y que <code>.env.local</code> tenga <code>NEXT_PUBLIC_MEDUSA_URL</code> y <code>PUBLISHABLE_KEY</code>.</p>
          <button onClick={() => loadFromApi(true)} className="mt-4 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "var(--terra)" }}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Tabs />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">{children}</main>
    </div>
  );
}
