# EstudioTéc — Calculadora de Producción

Aplicación web en **Next.js 14 + TypeScript + Tailwind CSS + Zustand** para el Estudio Técnico de producción de alimentos/bebidas.

---

## 🚀 Instalación y ejecución

### Prerrequisitos
- Node.js 18+ instalado ([descargar aquí](https://nodejs.org))

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Construir para producción
```bash
npm run build
npm start
```

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx        # Layout global (fuentes, metadata)
│   ├── page.tsx          # Página principal
│   └── globals.css       # Estilos globales + Tailwind
├── components/
│   ├── Header.tsx        # Barra superior
│   ├── Tabs.tsx          # Navegación por pestañas
│   ├── TabConfig.tsx     # Pestaña ① Producto
│   ├── TabInsumos.tsx    # Pestaña ② Insumos
│   ├── TabPersonal.tsx   # Pestaña ③ Personal
│   ├── TabResumen.tsx    # Pestaña ④ Resumen / Dashboard
│   └── ui.tsx            # Componentes reutilizables (Card, Input, Button...)
├── store/
│   └── useStore.ts       # Estado global con Zustand
└── types/
    └── index.ts          # TypeScript interfaces
```

---

## ✨ Funcionalidades

| Pestaña | Función |
|---------|---------|
| ① Producto | Nombre, unidad, precio, descripción, volumen con slider |
| ② Insumos | Agregar/editar/eliminar materias primas; cálculo automático por volumen |
| ③ Personal | Roles, personas, horas/día, costo/hora + overhead |
| ④ Resumen | KPIs, gráfico de barras, tabla de insumos, desglose completo, impresión |

---

## 🛠️ Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (estilos utilitarios)
- **Zustand** (estado global simple)
- **DM Serif Display + DM Sans** (tipografía Google Fonts)

---

## 📝 Personalización

Para adaptar a tu producto real:
1. Edita los datos iniciales en `src/store/useStore.ts` (arrays `insumos` y `personal`)
2. Cambia los colores en `tailwind.config.ts` y `globals.css`
3. Agrega nuevas categorías en `TabConfig.tsx`
