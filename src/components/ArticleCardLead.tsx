import Link from "next/link";
import Image from "next/image";
import type { ArticleMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { getCategory } from "@/lib/categories";
import { TopicCover } from "./article-covers";
import { ArrowRightIcon, CategoryIcon } from "./icons";

/** Portada principal (historia líder). Horizontal en escritorio: imagen a la izquierda. */
export function ArticleCardLead({ article }: { article: ArticleMeta }) {
  const category = getCategory(article.category);
  return (
    <article className="card group overflow-hidden lg:grid lg:grid-cols-2">
      <Link href={`/articulo/${article.slug}`} className="lg:contents">
        <div className="cover-scrim relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
          <span className="cover-badge">
            <CategoryIcon slug={article.category} className="h-3.5 w-3.5" />
            {category?.short}
          </span>
          {article.cover ? (
            <Image
              src={article.cover}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
            />
          ) : (
            <TopicCover category={article.category} slug={article.slug} className="h-full w-full" />
          )}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Historia destacada
          </span>
          <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight text-fg transition-colors duration-200 group-hover:text-accent sm:text-[2rem]">
            {article.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-pretty leading-relaxed text-muted">
            {article.description}
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs text-subtle">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.readingTime} de lectura</span>
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
            Leer artículo
            <ArrowRightIcon className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
