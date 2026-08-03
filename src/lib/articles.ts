import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { markdownToHtml } from "./markdown";
import type { Article, ArticleMeta, CategorySlug } from "./types";
import { categorySlugs } from "./categories";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

const validCategories = new Set<string>(categorySlugs());

function readRawFiles(): { slug: string; raw: string }[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
      return { slug, raw };
    });
}

function parseMeta(slug: string, raw: string): { meta: ArticleMeta; body: string } {
  const { data, content } = matter(raw);

  const category = String(data.category ?? "").trim() as CategorySlug;
  if (!validCategories.has(category)) {
    throw new Error(
      `Artículo "${slug}": categoría inválida "${category}". Usa una de: ${[...validCategories].join(", ")}`,
    );
  }

  const meta: ArticleMeta = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: new Date(data.date ?? Date.now()).toISOString(),
    updated: data.updated ? new Date(data.updated).toISOString() : undefined,
    category,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author ?? "Redacción Techix"),
    cover: data.cover ? String(data.cover) : undefined,
    coverCredit: data.coverCredit ? String(data.coverCredit) : undefined,
    coverCreditUrl: data.coverCreditUrl ? String(data.coverCreditUrl) : undefined,
    featured: Boolean(data.featured),
    readingTime: `${Math.max(1, Math.round(readingTime(content).minutes))} min`,
  };

  return { meta, body: content };
}

/** Todos los metadatos, ordenados de más nuevo a más antiguo. Cacheado por proceso. */
let _cache: ArticleMeta[] | null = null;

export function getAllArticles(): ArticleMeta[] {
  if (_cache) return _cache;
  const metas = readRawFiles()
    .map(({ slug, raw }) => parseMeta(slug, raw).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  _cache = metas;
  return metas;
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticle(): ArticleMeta | undefined {
  const all = getAllArticles();
  return all.find((a) => a.featured) ?? all[0];
}

export function getLatestArticles(limit = 6, excludeSlug?: string): ArticleMeta[] {
  return getAllArticles()
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}

export function getRelatedArticles(article: ArticleMeta, limit = 3): ArticleMeta[] {
  return getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => {
      let score = a.category === article.category ? 2 : 0;
      score += a.tags.filter((t) => article.tags.includes(t)).length;
      return { a, score };
    })
    .sort((x, y) => y.score - x.score || (x.a.date < y.a.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.a);
}

export async function getArticle(slug: string): Promise<Article | null> {
  const filePathMd = path.join(ARTICLES_DIR, `${slug}.md`);
  const filePathMdx = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const file = fs.existsSync(filePathMd)
    ? filePathMd
    : fs.existsSync(filePathMdx)
      ? filePathMdx
      : null;
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { meta, body } = parseMeta(slug, raw);
  const html = await markdownToHtml(body);
  return { ...meta, html, faq: extractFaq(body), toc: extractToc(body) };
}

/**
 * Índice de contenidos a partir de los encabezados H2, con los mismos IDs que
 * genera rehype-slug (github-slugger) para que los anclajes coincidan.
 */
function extractToc(body: string): { id: string; text: string }[] {
  const slugger = new GithubSlugger();
  const clean = body.replace(/```[\s\S]*?```/g, "");
  const toc: { id: string; text: string }[] = [];
  const re = /^##\s+(?!#)(.+?)\s*$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean)) !== null) {
    const text = m[1]
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\*\*([^*]*)\*\*/g, "$1")
      .replace(/\*([^*]*)\*/g, "$1")
      .trim();
    // Slug con el texto original (rehype-slug procesa el texto renderizado).
    const id = slugger.slug(text);
    toc.push({ id, text });
  }
  return toc;
}

/** Extrae las preguntas frecuentes (## Preguntas frecuentes → ### pregunta + respuesta) para datos estructurados FAQPage. */
function extractFaq(body: string): { question: string; answer: string }[] {
  const start = body.search(/^##\s+Preguntas frecuentes/im);
  if (start === -1) return [];
  const section = body.slice(start);
  const faqs: { question: string; answer: string }[] = [];
  const re = /^###\s+(.+?)\s*\n+([\s\S]*?)(?=\n###\s|\n##\s|$)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section)) !== null) {
    const question = m[1].trim();
    const answer = m[2]
      .trim()
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\*\*([^*]*)\*\*/g, "$1")
      .replace(/\*([^*]*)\*/g, "$1")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}
