export type CategorySlug =
  | "noticias"
  | "herramientas"
  | "comparativas"
  | "guias";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Etiqueta corta para chips y menús */
  short: string;
  description: string;
}

/** Metadatos de un artículo (sin el cuerpo renderizado). Ligero: apto para índices y listados. */
export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO — fecha de publicación
  updated?: string; // ISO — fecha de última actualización
  category: CategorySlug;
  tags: string[];
  author: string;
  cover?: string;
  coverCredit?: string;
  coverCreditUrl?: string;
  featured?: boolean;
  readingTime: string; // "5 min"
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TocItem {
  id: string;
  text: string;
}

/** Artículo completo, incluye el HTML del cuerpo, las FAQ y el índice extraídos. */
export interface Article extends ArticleMeta {
  html: string;
  faq: FaqItem[];
  toc: TocItem[];
}
