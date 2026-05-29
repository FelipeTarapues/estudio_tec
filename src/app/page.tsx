"use client";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import TabFichaTecnica from "@/components/TabFichaTecnica";
import TabMaterias from "@/components/TabMaterias";
import TabEmpaque from "@/components/TabEmpaque";
import TabRecursos from "@/components/TabRecursos";
import TabNomina from "@/components/TabNomina";
import TabResumen from "@/components/TabResumen";
import TabProyecciones from "@/components/TabProyecciones";
import { useStore } from "@/store/useStore";

export default function Home() {
  const activeTab = useStore((s) => s.activeTab);
  return (
    <div className="min-h-screen">
      <Header />
      <Tabs />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {activeTab === "ficha"    && <TabFichaTecnica />}
        {activeTab === "materias" && <TabMaterias />}
        {activeTab === "empaque"  && <TabEmpaque />}
        {activeTab === "recursos" && <TabRecursos />}
        {activeTab === "nomina"   && <TabNomina />}
        {activeTab === "resumen"  && <TabResumen />}
        {activeTab === "proyecciones" && <TabProyecciones />}
      </main>
    </div>
  );
}
