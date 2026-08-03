import type { Category, CategorySlug } from "./types";

export const categories: Category[] = [
  {
    slug: "noticias",
    name: "Noticias de IA",
    short: "Noticias",
    description:
      "Lo que de verdad importa en Inteligencia Artificial. Sin ruido ni titulares vacíos: solo lo que cambia el panorama.",
  },
  {
    slug: "herramientas",
    name: "Herramientas de IA",
    short: "Herramientas",
    description:
      "Las nuevas herramientas de IA que merecen tu tiempo, analizadas con criterio y ejemplos reales.",
  },
  {
    slug: "comparativas",
    name: "Comparativas",
    short: "Comparativas",
    description:
      "Enfrentamos las mejores herramientas cara a cara para que elijas con datos, no con marketing.",
  },
  {
    slug: "guias",
    name: "Guías y tutoriales",
    short: "Guías",
    description:
      "Guías paso a paso y tutoriales prácticos para dominar la IA y aplicarla a tu trabajo.",
  },
];

const bySlug = new Map<CategorySlug, Category>(
  categories.map((c) => [c.slug, c]),
);

export function getCategory(slug: string): Category | undefined {
  return bySlug.get(slug as CategorySlug);
}

export function categorySlugs(): CategorySlug[] {
  return categories.map((c) => c.slug);
}
