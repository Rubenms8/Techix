import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory, categorySlugs } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import { siteConfig } from "@/lib/site";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { CategoryIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface Params {
  params: { category: string };
}

export function generateStaticParams() {
  return categorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const category = getCategory(params.category);
  if (!category) return { title: "Categoría no encontrada" };

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categoria/${category.slug}` },
    openGraph: {
      title: `${category.name} · ${siteConfig.name}`,
      description: category.description,
      url: `${siteConfig.url}/categoria/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }: Params) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: category.name, item: `${siteConfig.url}/categoria/${category.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Cabecera */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 aurora opacity-70" aria-hidden />
        <div className="container py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-elevated text-accent">
              <CategoryIcon slug={category.slug} className="h-6 w-6" />
            </span>
            <h1 className="mt-6 text-balance text-[2rem] font-semibold tracking-tight text-fg sm:text-[2.75rem]">
              {category.name}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
              {category.description}
            </p>
            <p className="mt-6 text-sm text-subtle">
              {articles.length} {articles.length === 1 ? "artículo" : "artículos"}
            </p>
          </Reveal>

          {/* Navegación entre categorías */}
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => {
              const active = c.slug === category.slug;
              return (
                <Link
                  key={c.slug}
                  href={`/categoria/${c.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-transparent bg-fg text-bg"
                      : "border-border bg-elevated text-muted hover:border-border-strong hover:text-fg",
                  )}
                >
                  <CategoryIcon slug={c.slug} className="h-3.5 w-3.5" />
                  {c.short}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Listado */}
      <section className="container py-14">
        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 80}>
                <ArticleCard article={a} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border py-16 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <CategoryIcon slug={category.slug} className="h-6 w-6" />
            </span>
            <p className="mt-5 font-medium text-fg">Contenido en camino</p>
            <p className="mt-1 text-sm text-muted">
              Estamos preparando los primeros artículos de {category.short.toLowerCase()}.
            </p>
            <Link href="/" className="btn-secondary mt-6">
              Volver al inicio
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
