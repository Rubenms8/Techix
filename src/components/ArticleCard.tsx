import Link from "next/link";
import Image from "next/image";
import type { ArticleMeta } from "@/lib/types";
import { formatDateShort, cn } from "@/lib/utils";
import { getCategory } from "@/lib/categories";
import { TopicCover } from "./article-covers";

interface ArticleCardProps {
  article: ArticleMeta;
  priority?: boolean;
  className?: string;
  /** Muestra un extracto de 2 líneas bajo el título. */
  showExcerpt?: boolean;
}

export function ArticleCard({ article, priority, className, showExcerpt = false }: ArticleCardProps) {
  const category = getCategory(article.category);
  return (
    <article className={cn("card group flex flex-col overflow-hidden", className)}>
      <Link href={`/articulo/${article.slug}`} className="flex flex-1 flex-col">
        <div className="cover-scrim relative aspect-[16/10] overflow-hidden">
          {article.cover ? (
            <Image
              src={article.cover}
              alt={article.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.05]"
            />
          ) : (
            <div className="h-full w-full transition-transform duration-500 ease-smooth group-hover:scale-[1.05]">
              <TopicCover category={article.category} slug={article.slug} className="h-full w-full" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <span className="kicker">{category?.short}</span>

          <h3 className="mt-2 text-balance text-[1.05rem] font-semibold leading-snug tracking-tight text-fg transition-colors duration-200 group-hover:text-accent">
            {article.title}
          </h3>

          {showExcerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
              {article.description}
            </p>
          )}

          <div className="mt-3.5 flex items-center gap-2 border-t border-border pt-3 text-xs text-subtle">
            <time dateTime={article.date}>{formatDateShort(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.readingTime} de lectura</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
