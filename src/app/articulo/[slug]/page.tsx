import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllSlugs, getArticle, getRelatedArticles } from "@/lib/articles";
import { getCategory } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { AdSlot } from "@/components/AdSlot";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TopicCover } from "@/components/article-covers";
import { TableOfContents } from "@/components/TableOfContents";
import { slugifyTag, tagLabel } from "@/lib/tags";
import { ArrowRightIcon } from "@/components/icons";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Artículo no encontrado" };

  const url = `${siteConfig.url}/articulo/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articulo/${article.slug}` },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: [article.author],
      images: article.cover ? [{ url: article.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.cover ? [article.cover] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const related = getRelatedArticles(article, 3);

  const updated = article.updated ?? article.date;
  const articleUrl = `${siteConfig.url}/articulo/${article.slug}`;
  const imageUrl = article.cover ? `${siteConfig.url}${article.cover}` : `${siteConfig.url}/opengraph-image`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: updated,
      inLanguage: "es-ES",
      author: { "@type": "Organization", name: article.author, url: siteConfig.url },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon.svg` },
      },
      mainEntityOfPage: articleUrl,
      image: [imageUrl],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: category?.name ?? "",
          item: `${siteConfig.url}/categoria/${article.category}`,
        },
        { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
      ],
    },
  ];

  if (article.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />

      <article className="container pt-10 sm:pt-14">
        {/* Migas */}
        <nav aria-label="Migas de pan" className="mb-8 text-sm text-subtle">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="transition-colors hover:text-fg">Inicio</Link></li>
            <li aria-hidden className="text-border-strong">/</li>
            <li>
              <Link href={`/categoria/${article.category}`} className="transition-colors hover:text-fg">
                {category?.short}
              </Link>
            </li>
          </ol>
        </nav>

        <header className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-subtle">
            <CategoryBadge category={article.category} withIcon />
            <span aria-hidden>·</span>
            <span>{article.readingTime} de lectura</span>
          </div>
          <h1 className="mt-5 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-fg sm:text-[2.75rem]">
            {article.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
            {article.description}
          </p>
          <div className="mt-7 flex items-center gap-3 border-b border-border pb-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent" aria-hidden>
              {article.author.charAt(0)}
            </span>
            <div className="text-sm">
              <Link href="/sobre" className="font-medium text-fg transition-colors hover:text-accent">
                {article.author}
              </Link>
              <p className="mt-0.5 text-xs text-subtle">
                Publicado el{" "}
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                {" · Actualizado el "}
                <time dateTime={updated}>{formatDate(updated)}</time>
              </p>
            </div>
          </div>
        </header>

        {article.cover ? (
          <figure className="mx-auto mt-10 max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            {article.coverCredit && (
              <figcaption className="mt-2 text-right text-xs text-subtle">
                Foto:{" "}
                {article.coverCreditUrl ? (
                  <a
                    href={article.coverCreditUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline-offset-2 transition-colors hover:text-fg hover:underline"
                  >
                    {article.coverCredit}
                  </a>
                ) : (
                  article.coverCredit
                )}{" "}
                / Pexels
              </figcaption>
            )}
          </figure>
        ) : (
          <div className="mx-auto mt-10 max-w-4xl">
            <TopicCover
              category={article.category}
              slug={article.slug}
              className="aspect-[16/7] rounded-2xl border border-border"
            />
          </div>
        )}

        {article.toc.length >= 4 && (
          <div className="mx-auto max-w-prose">
            <TableOfContents items={article.toc} />
          </div>
        )}

        <div
          className="prose-techix mx-auto mt-8 max-w-prose"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {/* Anuncio no intrusivo, al final del contenido */}
        <div className="mx-auto mt-12 max-w-prose">
          <AdSlot slot="article-bottom" minHeight={120} />
        </div>

        {/* Etiquetas */}
        {article.tags.length > 0 && (
          <div className="mx-auto mt-10 max-w-prose border-t border-border pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-subtle">Temas</span>
              {article.tags.map((tag) => {
                const s = slugifyTag(tag);
                return (
                  <Link
                    key={tag}
                    href={`/etiqueta/${s}`}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    #{tagLabel(s)}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA volver a categoría */}
        <div className="mx-auto mt-10 max-w-prose">
          <Link
            href={`/categoria/${article.category}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
            Más en {category?.short}
          </Link>
        </div>
      </article>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="container mt-24">
          <div className="section-rule mb-8 flex items-end justify-between gap-4 pb-3">
            <h2 className="text-2xl font-semibold tracking-tight text-fg">También te puede interesar</h2>
            <Link
              href={`/categoria/${article.category}`}
              className="hidden shrink-0 whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-accent sm:inline"
            >
              Más en {category?.short}
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
