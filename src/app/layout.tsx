import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstudioTéc · Calculadora de Producción",
  description: "Herramienta tecnológica para estudio técnico de producción",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
