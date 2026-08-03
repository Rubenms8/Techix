import type { Metadata } from "next";
import Link from "next/link";
import { getIndexableTags } from "@/lib/tags";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Todas las etiquetas",
  description: `Explora todos los temas de ${siteConfig.name}: ChatGPT, Gemini, Claude, herramientas de IA, productividad, agentes y mucho más.`,
  alternates: { canonical: "/etiquetas" },
};

export default function TagsIndexPage() {
  const tags = getIndexableTags();
  const max = tags[0]?.count ?? 1;

  return (
    <section className="container py-16 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow justify-center">Temas</p>
        <h1 className="mt-3 text-balance text-[2rem] font-semibold tracking-tight text-fg sm:text-[2.5rem]">
          Explora Techix por temas
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted">
          Todas las etiquetas de la web. Pulsa cualquier tema para ver los artículos relacionados.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-2.5">
        {tags.map((t) => {
          const big = t.count >= Math.max(3, max * 0.6);
          return (
            <Link
              key={t.slug}
              href={`/etiqueta/${t.slug}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border transition-colors duration-200",
                big
                  ? "border-accent/25 bg-accent-soft px-4 py-2 text-sm font-semibold text-accent hover:border-accent/50"
                  : "border-border bg-elevated px-3.5 py-1.5 text-sm font-medium text-muted hover:border-border-strong hover:text-fg",
              )}
            >
              <span className={cn(big ? "text-accent/60" : "text-subtle")}>#</span>
              {t.label}
              <span className={cn("text-xs", big ? "text-accent/60" : "text-subtle")}>{t.count}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
