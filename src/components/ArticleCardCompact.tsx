import Link from "next/link";
import Image from "next/image";
import type { ArticleMeta } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";
import { getCategory } from "@/lib/categories";
import { ArticleCover } from "./ArticleCover";

/** Fila compacta: miniatura + categoría, título y meta. Ideal para listas densas. */
export function ArticleCardCompact({ article }: { article: ArticleMeta }) {
  const category = getCategory(article.category);
  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="group flex items-start gap-4 py-4"
    >
      <div className="relative h-[68px] w-[92px] shrink-0 overflow-hidden rounded-lg border border-border">
        {article.cover ? (
          <Image
            src={article.cover}
            alt={article.title}
            fill
            sizes="92px"
            className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
          />
        ) : (
          <ArticleCover
            category={article.category}
            seed={article.slug}
            className="h-full w-full"
            iconSize={18}
            brand={false}
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-accent">
          {category?.short}
        </div>
        <h3 className="line-clamp-2 text-[0.95rem] font-semibold leading-snug tracking-tight text-fg transition-colors duration-200 group-hover:text-accent">
          {article.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-subtle">
          <time dateTime={article.date}>{formatDateShort(article.date)}</time>
          <span aria-hidden>·</span>
          <span>{article.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
