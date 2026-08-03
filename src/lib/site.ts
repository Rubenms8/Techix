export const siteConfig = {
  name: "Techix",
  tagline: "Inteligencia Artificial, con criterio.",
  description:
    "Techix es la plataforma sobre Inteligencia Artificial: noticias que importan, nuevas herramientas, comparativas honestas y guías prácticas. Sin ruido.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techix.dev",
  locale: "es_ES",
  author: "Redacción Techix",
  twitter: "@techixai",
  nav: [
    { label: "Noticias", href: "/categoria/noticias" },
    { label: "Herramientas", href: "/categoria/herramientas" },
    { label: "Comparativas", href: "/categoria/comparativas" },
    { label: "Guías", href: "/categoria/guias" },
    { label: "Temas", href: "/etiquetas" },
  ],
  contact: {
    email: "contact.techix@gmail.com",
    tiktok: "https://www.tiktok.com/@techixai",
    instagram: "https://www.instagram.com/techixai",
  },
} as const;

export type SiteConfig = typeof siteConfig;
