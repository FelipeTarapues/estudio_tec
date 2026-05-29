import type { FichaTecnica } from "@/types";

/** Textos base desde la hoja «Ficha tecnica» del Excel (ortografía corregida en instrucciones de uso). */
export const FICHA_TECNICA_INICIAL: FichaTecnica = {
  producto: "Dulce Aroma de la montaña",
  fabricante: "Colanta",
  modelo: "HD-2026",
  marca: "Cooperativa Colanta",
  presentacion: "200 g",
  descripcionProducto:
    "Helado artesanal elaborado con mezcla de tres leches (entera, condensada y crema de leche), saborizado con crema de ron, con textura cremosa y homogénea. Producto congelado listo para consumo.",
  especificacionesTecnicas: `Tipo de producto: Postre helado gourmet.

Sistema de envasado: Envase plástico grado alimenticio con tapa hermética y etiqueta impresa.

Vida útil y almacenamiento: 6 meses bajo congelación a -18 °C. Mantener en cadena de frío continua.

Porción estándar: 200 g (1 unidad)`,
  instruccionesUso:
    "Consumir directamente del envase o servir en copas/postres. Mantener congelado hasta el momento de consumo. No volver a congelar una vez descongelado. Consumir lo antes posible después de su apertura.",
  beneficios: `Producto innovador con perfil gourmet.

Textura cremosa y sabor balanceado con notas de ron.

Cumple con estándares de higiene y calidad.`,
  advertencias: `Mantener fuera del alcance de menores de edad por su contenido alcohólico (mínimo 1–2%).

No consumir si el envase está dañado o presenta alteraciones.

El consumo excesivo puede generar efectos por el contenido de alcohol.`,
  composicion: `Leche entera pasteurizada: 40 %
Leche condensada: 20 %
Crema de leche: 20 %
Azúcar refinada: 10 %
Crema de ron: 5 %
Estabilizantes/emulsificantes permitidos: 5 %`,
  empaque: `Envases plásticos de 200 g, cajas de cartón corrugado de 25 kg
Material: polipropileno grado alimenticio, reciclable.
Etiquetado conforme a Resolución 5109 de 2005 (rotulado de alimentos en Colombia).`,
  rotulado: `Registro sanitario INVIMA: [pendiente de trámite].
Registro de marca: [pendiente de SIC].
Código EAN: [definir según lote].`,
  lugarElaboracion:
    "Carrera 49 # 40 - 86, San Pedro, San Pedro de los Milagros, Antioquia",
  fechaElaboracion: "27 de marzo de 2026",
  unidadVenta: "Caja con 24 unidades de 200 g",
};
