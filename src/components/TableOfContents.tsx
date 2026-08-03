import type { TocItem } from "@/lib/types";

/** Índice de contenidos elegante para artículos largos. Enlaza a los anclajes de cada sección. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 4) return null;

  return (
    <nav
      aria-label="Índice de contenidos"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-subtle">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
        En este artículo
      </p>
      <ol className="mt-4 space-y-1">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group flex items-baseline gap-3 rounded-lg px-2 py-1.5 text-sm text-muted transition-colors hover:bg-elevated hover:text-accent"
            >
              <span className="w-5 shrink-0 text-right font-mono text-xs text-subtle transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty leading-snug">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
