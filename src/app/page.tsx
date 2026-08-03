import Link from "next/link";
import { getAllArticles, getFeaturedArticle, getArticlesByCategory } from "@/lib/articles";
import { getCategory, categories } from "@/lib/categories";
import type { ArticleMeta, CategorySlug } from "@/lib/types";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCardLead } from "@/components/ArticleCardLead";
import { ArticleCardCompact } from "@/components/ArticleCardCompact";
import { Reveal } from "@/components/Reveal";
import { Newsletter } from "@/components/Newsletter";
import { CategoryIcon, ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

// Pilares perennes que queremos siempre a mano ("Lo más leído").
const ESSENTIALS = [
  "mejores-herramientas-ia-gratis-2026",
  "como-usar-chatgpt-principiantes-2026",
  "mejores-prompts-chatgpt-2026",
  "chatgpt-vs-gemini-vs-claude-2026",
  "como-ganar-dinero-con-ia-2026",
];

// Temas en tendencia (a búsqueda). Texto → /buscar?q=
const TRENDING = [
  "ChatGPT", "Gemini", "Claude", "Agentes de IA", "Vídeo IA",
  "Prompts", "Deepfakes", "Midjourney", "IA gratis", "Ganar dinero",
];

export default function HomePage() {
  const all = getAllArticles();
  const featured = getFeaturedArticle();
  const rest = all.filter((a) => a.slug !== featured?.slug);

  const secondary = rest.slice(0, 3);
  const river = rest.slice(3, 8);
  const moreHeadlines = rest.slice(8, 14);

  const bySlug = new Map(all.map((a) => [a.slug, a]));
  const mostRead = ESSENTIALS.map((s) => bySlug.get(s)).filter(Boolean) as ArticleMeta[];

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="pb-10">
      <h1 className="sr-only">
        Techix — Inteligencia Artificial: noticias, herramientas, comparativas y guías
      </h1>

      {/* ===== Masthead ===== */}
      <div className="border-b border-border bg-surface">
        <div className="container flex items-center justify-between gap-4 py-2.5">
          <p className="flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-semibold text-fg">La portada de la IA</span>
            <span className="hidden text-subtle sm:inline">· actualizada a diario</span>
          </p>
          <nav aria-label="Secciones" className="hidden items-center gap-4 md:flex">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                className="text-xs font-medium text-subtle transition-colors hover:text-accent"
              >
                {c.short}
              </Link>
            ))}
          </nav>
          <p className="text-xs capitalize text-subtle md:hidden">{today}</p>
        </div>
      </div>

      {/* ===== Portada (front page) ===== */}
      <section className="container pt-6 lg:pt-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Columna principal */}
          <div className="lg:col-span-8">
            {featured && (
              <Reveal>
                <ArticleCardLead article={featured} />
              </Reveal>
            )}

            {secondary.length > 0 && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {secondary.map((a, i) => (
                  <Reveal key={a.slug} delay={(i % 3) * 70} className={cn(i === 2 && "sm:hidden lg:block")}>
                    <ArticleCard article={a} showExcerpt />
                  </Reveal>
                ))}
              </div>
            )}

            {moreHeadlines.length > 0 && (
              <div className="mt-8">
                <div className="section-rule mb-1 pb-2">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-fg">Más historias</h2>
                </div>
                <div className="grid gap-x-8 sm:grid-cols-2">
                  {moreHeadlines.map((a) => (
                    <MiniHeadline key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Barra lateral */}
          <aside className="lg:col-span-4 lg:border-l lg:border-border lg:pl-8">
            <div className="lg:sticky lg:top-24">
              <SidebarModule title="Lo último" href="/buscar">
                <div className="divide-y divide-border">
                  {river.map((a) => (
                    <ArticleCardCompact key={a.slug} article={a} />
                  ))}
                </div>
              </SidebarModule>

              {mostRead.length > 0 && (
                <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
                  <SidebarModule title="Lo más leído">
                    <ol className="mt-1">
                      {mostRead.map((a, i) => (
                        <HeadlineItem key={a.slug} article={a} rank={i + 1} />
                      ))}
                    </ol>
                  </SidebarModule>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Explora por sección ===== */}
      <SectionCards />

      {/* ===== Raíles + Tendencias ===== */}
      <Rail slug="noticias" />
      <Rail slug="comparativas" tint />
      <Trending />
      <Rail slug="herramientas" tint />
      <Rail slug="guias" />

      {/* ===== Newsletter ===== */}
      <div className="mt-16">
        <Reveal>
          <Newsletter />
        </Reveal>
      </div>
    </div>
  );
}

/* ---------- Piezas ---------- */

function SidebarModule({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b-2 border-fg pb-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-fg">{title}</h2>
        {href && (
          <Link href={href} className="text-xs font-medium text-muted transition-colors hover:text-accent">
            Ver todo
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

function HeadlineItem({ article, rank }: { article: ArticleMeta; rank: number }) {
  const category = getCategory(article.category);
  return (
    <li className="border-b border-border last:border-0">
      <Link href={`/articulo/${article.slug}`} className="group flex gap-3 py-3">
        <span className="w-6 shrink-0 text-xl font-bold tabular-nums text-accent/40">{rank}</span>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
            {category?.short}
          </span>
          <h3 className="mt-0.5 line-clamp-2 text-[0.9rem] font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
            {article.title}
          </h3>
          <span className="mt-1 block text-xs text-subtle">{article.readingTime} de lectura</span>
        </div>
      </Link>
    </li>
  );
}

/** Bloque de secciones en navy: hace muy visibles las categorías y añade color de marca. */
function SectionCards() {
  return (
    <section className="container mt-16">
      <div className="section-rule mb-6 flex items-end justify-between gap-4 pb-3">
        <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">Explora por sección</h2>
        <span className="hidden text-sm text-subtle sm:block">Todo el contenido, organizado</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => {
          const count = getArticlesByCategory(c.slug).length;
          return (
            <Reveal key={c.slug} delay={(i % 4) * 60}>
              <Link
                href={`/categoria/${c.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[hsl(var(--navy))] p-5 text-white transition-transform duration-300 ease-smooth hover:-translate-y-0.5"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, hsl(223 100% 60% / 0.5), transparent 70%)" }}
                  aria-hidden
                />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                  <CategoryIcon slug={c.slug} className="h-5 w-5" />
                </span>
                <h3 className="relative mt-4 text-lg font-semibold tracking-tight">{c.name}</h3>
                <p className="relative mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/60">
                  {c.description}
                </p>
                <div className="relative mt-4 flex items-center justify-between pt-3 text-xs">
                  <span className="font-medium text-white/50">{count} artículos</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors group-hover:bg-accent group-hover:ring-accent">
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function MiniHeadline({ article }: { article: ArticleMeta }) {
  const category = getCategory(article.category);
  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="group flex flex-col gap-1 border-b border-border py-3.5"
    >
      <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
        {category?.short}
      </span>
      <h3 className="line-clamp-2 text-[0.95rem] font-semibold leading-snug tracking-tight text-fg transition-colors duration-200 group-hover:text-accent">
        {article.title}
      </h3>
      <span className="text-xs text-subtle">
        {article.readingTime} de lectura
      </span>
    </Link>
  );
}

function Rail({ slug, tint = false }: { slug: CategorySlug; tint?: boolean }) {
  const category = getCategory(slug);
  const articles = getArticlesByCategory(slug).slice(0, 3);
  if (!category || articles.length === 0) return null;

  const inner = (
    <>
      <div className="section-rule mb-6 flex items-end justify-between gap-4 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent-soft text-accent">
            <CategoryIcon slug={slug} className="h-5 w-5" />
          </span>
          <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{category.name}</h2>
        </div>
        <Link
          href={`/categoria/${slug}`}
          className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          Ver todo
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 3) * 70} className={cn(i === 2 && "sm:hidden lg:block")}>
            <ArticleCard article={a} showExcerpt={i === 0} />
          </Reveal>
        ))}
      </div>
    </>
  );

  if (tint) {
    return (
      <section className="mt-14 border-y border-border bg-surface py-12">
        <div className="container">{inner}</div>
      </section>
    );
  }
  return <section className="container mt-14">{inner}</section>;
}

function Trending() {
  return (
    <section className="container mt-14">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[hsl(var(--navy))] p-7 sm:p-10">
        {/* Glow de marca sutil */}
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(223 100% 60% / 0.35), transparent 70%)" }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }} />
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/15">
              <ArrowRightIcon className="h-4 w-4 -rotate-45" />
            </span>
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Tendencias</h2>
          </div>
          <p className="mt-2 text-sm text-white/60">Los temas que más se buscan ahora mismo en Techix.</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {TRENDING.map((t) => (
              <Link
                key={t}
                href={`/buscar?q=${encodeURIComponent(t)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors duration-200 hover:border-accent/60 hover:bg-accent/20 hover:text-white"
              >
                <span className="text-white/40">#</span>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
