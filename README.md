# Techix

Plataforma profesional sobre **Inteligencia Artificial**: noticias que importan, nuevas herramientas, comparativas honestas y guías prácticas. Diseño minimalista y premium, rápido y optimizado para SEO.

Construido con **Next.js 14 (App Router)**, **TypeScript** y **Tailwind CSS**.

## Requisitos

- [Node.js](https://nodejs.org) 18.18 o superior (recomendado 20 LTS)
- npm (incluido con Node)

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local

# 3. Arrancar en desarrollo
npm run dev
```

Abre <http://localhost:3000>.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Linter |

## Estructura

```
content/articles/        Artículos en Markdown (una nota = un archivo .md)
src/app/                 Rutas (App Router)
  page.tsx               Página principal
  articulo/[slug]/       Página de artículo
  categoria/[category]/  Página de categoría
  buscar/                Buscador
  sobre / privacidad / contacto
  sitemap.ts, robots.ts, manifest.ts
src/components/          Header, Footer, ArticleCard, SearchClient, AdSlot...
src/lib/                 Carga de artículos, categorías, tipos, config del sitio
```

## Cómo publicar un artículo nuevo

Crea un archivo `content/articles/mi-articulo.md`:

```markdown
---
title: "Título del artículo"
description: "Resumen breve para listados y SEO."
date: "2026-08-01"
category: "noticias"   # noticias | herramientas | comparativas | guias
author: "Equipo Techix"
featured: false         # true para destacarlo en la home
cover: "https://..."    # opcional
tags: ["ia", "tema"]
---

Aquí va el contenido en **Markdown**.
```

El artículo aparece automáticamente en su categoría, en el buscador y en el sitemap. El sistema escala a cientos de artículos sin cambios de código.

## SEO

- Metadatos por página (título, descripción, canonical, Open Graph, Twitter).
- `sitemap.xml` y `robots.txt` generados automáticamente.
- Datos estructurados (JSON-LD) en los artículos.
- Imágenes optimizadas con `next/image`.

## Google AdSense (preparado, no intrusivo)

La web ya está lista para AdSense **sin molestar al usuario**:

1. Cuando tengas la aprobación, añade tu ID en `.env.local`:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
   ```
2. Los bloques `<AdSlot />` aparecerán automáticamente, con espacio reservado
   (sin saltos de layout) y etiquetados como "Publicidad".
3. Sin ese ID, **no se carga ningún script ni anuncio**.

## Despliegue

Optimizado para [Vercel](https://vercel.com). Importa el repositorio, define
`NEXT_PUBLIC_SITE_URL` y despliega. También funciona en cualquier host con Node.
