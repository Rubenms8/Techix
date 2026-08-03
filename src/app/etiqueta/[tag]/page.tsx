import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTag, indexableTagSlugs, isIndexableTag, getArticlesByTag } from "@/lib/tags";
import { siteConfig } from "@/lib/site";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRightIcon } from "@/components/icons";

interface Params {
  params: { tag: string };
}

export function generateStaticParams() {
  return indexableTagSlugs().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const tag = getTag(params.tag);
  if (!tag) return { title: "Etiqueta no encontrada" };

  const title = `${tag.label}: artículos sobre ${tag.label}`;
  const description = `Todos los artículos de Techix sobre ${tag.label}: noticias, herramientas, comparativas y guías de Inteligencia Artificial.`;
  return {
    title,
    description,
    alternates: { canonical: `/etiqueta/${tag.slug}` },
    // Las etiquetas con muy pocos artículos se dejan sin indexar para evitar páginas "finas".
    robots: isIndexableTag(tag.slug) ? undefined : { index: false, follow: true },
    openGraph: { title: `${tag.label} · ${siteConfig.name}`, description, url: `${siteConfig.url}/etiqueta/${tag.slug}` },
  };
}

export default function TagPage({ params }: Params) {
  const tag = getTag(params.tag);
  if (!tag) notFound();

  const articles = getArticlesByTag(tag.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Etiquetas", item: `${siteConfig.url}/etiquetas` },
      { "@type": "ListItem", position: 3, name: tag.label, item: `${siteConfig.url}/etiqueta/${tag.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-border">
        <div className="container py-14 sm:py-16">
          <nav aria-label="Migas de pan" className="mb-6 text-sm text-subtle">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-fg">Inicio</Link></li>
              <li aria-hidden className="text-border-strong">/</li>
              <li><Link href="/etiquetas" className="transition-colors hover:text-fg">Etiquetas</Link></li>
            </ol>
          </nav>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Etiqueta</p>
            <h1 className="mt-3 text-balance text-[2rem] font-semibold tracking-tight text-fg sm:text-[2.75rem]">
              #{tag.label}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
              Todo lo que hemos publicado sobre {tag.label}.
            </p>
            <p className="mt-6 text-sm text-subtle">
              {articles.length} {articles.length === 1 ? "artículo" : "artículos"}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container py-14">
        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 70}>
                <ArticleCard article={a} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No hay artículos con esta etiqueta.</p>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/etiquetas"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            Ver todas las etiquetas
            <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
