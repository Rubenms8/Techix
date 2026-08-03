import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllArticles } from "@/lib/articles";
import { categorySlugs } from "@/lib/categories";
import { indexableTagSlugs } from "@/lib/tags";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/etiquetas`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/sobre`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contacto`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookies`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/aviso-legal`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const tagRoutes: MetadataRoute.Sitemap = indexableTagSlugs().map((slug) => ({
    url: `${base}/etiqueta/${slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs().map((slug) => ({
    url: `${base}/categoria/${slug}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${base}/articulo/${a.slug}`,
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...tagRoutes, ...articleRoutes];
}
