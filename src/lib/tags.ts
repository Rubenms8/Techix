import "server-only";
import { getAllArticles } from "./articles";
import type { ArticleMeta } from "./types";

/** Convierte una etiqueta en un slug limpio y estable para la URL. */
export function slugifyTag(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Nombres con el formato de marca correcto (el resto se capitaliza automáticamente). */
const LABELS: Record<string, string> = {
  chatgpt: "ChatGPT",
  "chatgpt-plus": "ChatGPT Plus",
  gpts: "GPTs",
  openai: "OpenAI",
  claude: "Claude",
  anthropic: "Anthropic",
  gemini: "Gemini",
  deepseek: "DeepSeek",
  grok: "Grok",
  llama: "Llama",
  mistral: "Mistral",
  midjourney: "Midjourney",
  "dall-e": "DALL·E",
  leonardo: "Leonardo",
  firefly: "Firefly",
  ideogram: "Ideogram",
  copilot: "Copilot",
  "github-copilot": "GitHub Copilot",
  "microsoft-copilot": "Microsoft Copilot",
  cursor: "Cursor",
  perplexity: "Perplexity",
  notebooklm: "NotebookLM",
  "notion-ai": "Notion AI",
  "meta-ai": "Meta AI",
  "apple-intelligence": "Apple Intelligence",
  siri: "Siri",
  elevenlabs: "ElevenLabs",
  suno: "Suno",
  udio: "Udio",
  heygen: "HeyGen",
  synthesia: "Synthesia",
  capcut: "CapCut",
  gamma: "Gamma",
  canva: "Canva",
  n8n: "n8n",
  make: "Make",
  zapier: "Zapier",
  veo: "Veo",
  kling: "Kling",
  runway: "Runway",
  sora: "Sora",
  deepl: "DeepL",
  "google-translate": "Google Translate",
  google: "Google",
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  whatsapp: "WhatsApp",
  "amazon-kdp": "Amazon KDP",
  seo: "SEO",
  cv: "CV",
  ia: "IA",
  "ia-gratis": "IA gratis",
  "ia-generativa": "IA generativa",
  "machine-learning": "Machine Learning",
  "deep-learning": "Deep Learning",
  "codigo-abierto": "Código abierto",
  "open-source": "Open Source",
  "ai-act": "AI Act",
  llm: "LLM",
};

const SMALL = new Set(["de", "con", "y", "para", "sin", "la", "el", "los", "las", "en", "a", "o", "por", "un", "una"]);

/** Nombre legible para mostrar de una etiqueta. */
export function tagLabel(slug: string): string {
  if (LABELS[slug]) return LABELS[slug];
  return slug
    .split("-")
    .map((w, i) => (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

export interface TagInfo {
  slug: string;
  label: string;
  count: number;
}

let _cache: Map<string, TagInfo> | null = null;

function build(): Map<string, TagInfo> {
  if (_cache) return _cache;
  const map = new Map<string, TagInfo>();
  for (const a of getAllArticles()) {
    for (const raw of a.tags) {
      const slug = slugifyTag(raw);
      if (!slug) continue;
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { slug, label: tagLabel(slug), count: 1 });
    }
  }
  _cache = map;
  return map;
}

/** Etiquetas con al menos este nº de artículos se consideran "de fondo" (indexables). */
export const INDEX_MIN = 2;

/** Todas las etiquetas, ordenadas por número de artículos (desc). */
export function getAllTags(): TagInfo[] {
  return [...build().values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/** Solo etiquetas con contenido suficiente (evita páginas "finas" para SEO/AdSense). */
export function getIndexableTags(): TagInfo[] {
  return getAllTags().filter((t) => t.count >= INDEX_MIN);
}

export function getTag(slug: string): TagInfo | undefined {
  return build().get(slug);
}

export function isIndexableTag(slug: string): boolean {
  const t = build().get(slug);
  return !!t && t.count >= INDEX_MIN;
}

/** Slugs de etiquetas indexables (para prerender y sitemap). */
export function indexableTagSlugs(): string[] {
  return getIndexableTags().map((t) => t.slug);
}

/** Artículos que contienen una etiqueta (por slug), de más nuevo a más antiguo. */
export function getArticlesByTag(slug: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.tags.some((t) => slugifyTag(t) === slug));
}
