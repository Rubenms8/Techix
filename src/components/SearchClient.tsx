"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/types";
import { categories } from "@/lib/categories";
import { formatDateShort, cn } from "@/lib/utils";
import { CategoryBadge } from "./CategoryBadge";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

interface SearchClientProps {
  articles: ArticleMeta[];
  initialQuery?: string;
}

export function SearchClient({ articles, initialQuery = "" }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return articles.filter((a) => {
      if (active && a.category !== active) return false;
      if (!q) return true;
      const haystack = normalize(
        [a.title, a.description, a.category, a.tags.join(" "), a.author].join(" "),
      );
      return q.split(/\s+/).every((term) => haystack.includes(term));
    });
  }, [articles, query, active]);

  return (
    <div>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle" />
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca artículos, herramientas, temas…"
          className="h-14 w-full rounded-xl border border-border bg-elevated pl-12 pr-4 text-base text-fg placeholder:text-subtle shadow-soft transition-colors focus:border-accent/50"
          aria-label="Buscar en Techix"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <FilterChip label="Todo" active={active === null} onClick={() => setActive(null)} />
        {categories.map((c) => (
          <FilterChip
            key={c.slug}
            label={c.short}
            active={active === c.slug}
            onClick={() => setActive(active === c.slug ? null : c.slug)}
          />
        ))}
      </div>

      <p className="mt-6 text-sm text-subtle" aria-live="polite">
        {results.length} {results.length === 1 ? "resultado" : "resultados"}
        {query.trim() && ` para “${query.trim()}”`}
      </p>

      <ul className="mt-4 divide-y divide-border">
        {results.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articulo/${a.slug}`}
              className="group flex flex-col gap-1 py-5 transition-opacity hover:opacity-100"
            >
              <div className="flex items-center gap-3 text-xs text-subtle">
                <CategoryBadge category={a.category} asLink={false} />
                <span aria-hidden>·</span>
                <time dateTime={a.date}>{formatDateShort(a.date)}</time>
                <span aria-hidden>·</span>
                <span>{a.readingTime}</span>
              </div>
              <h2 className="text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
                {a.title}
              </h2>
              <p className="line-clamp-2 text-sm text-muted">{a.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          {articles.length === 0 ? (
            <>
              <p className="font-medium text-fg">Aún no hay artículos publicados.</p>
              <p className="mt-1 text-sm text-muted">
                El sistema está listo: en cuanto se publique contenido, aparecerá aquí.
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-fg">Sin resultados.</p>
              <p className="mt-1 text-sm text-muted">Prueba con otras palabras o quita los filtros.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
        active
          ? "border-fg bg-fg text-bg"
          : "border-border bg-elevated text-muted hover:text-fg hover:border-fg/20",
      )}
    >
      {label}
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
