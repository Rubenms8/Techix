import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Buscar",
  description:
    "Busca entre todos los artículos de Techix: noticias, herramientas, comparativas y guías de IA.",
  alternates: { canonical: "/buscar" },
  robots: { index: false, follow: true },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const articles = getAllArticles();
  const initialQuery = typeof searchParams.q === "string" ? searchParams.q : "";

  return (
    <section className="container py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="eyebrow">Buscador</p>
          <h1 className="mt-3 text-balance text-[2rem] font-semibold tracking-tight text-fg sm:text-[2.5rem]">
            Encuentra lo que buscas
          </h1>
          <p className="mt-3 text-muted">
            Filtra por título, tema, herramienta o categoría entre todo el contenido de Techix.
          </p>
        </header>
        <SearchClient articles={articles} initialQuery={initialQuery} />
      </div>
    </section>
  );
}
