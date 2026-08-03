import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SignalIcon, FilterIcon, BoltIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: `Qué es ${siteConfig.name} y por qué existe: Inteligencia Artificial explicada con criterio, sin ruido.`,
  alternates: { canonical: "/sobre" },
};

const principles = [
  {
    icon: SignalIcon,
    title: "Señal sobre ruido",
    text: "No publicamos por publicar. Filtramos lo que de verdad cambia cómo trabajas, creas o decides.",
  },
  {
    icon: FilterIcon,
    title: "Criterio, no hype",
    text: "Priorizamos la claridad sobre la moda y la honestidad sobre el clic fácil.",
  },
  {
    icon: BoltIcon,
    title: "Utilidad real",
    text: "Cada artículo busca dejarte algo aplicable: una idea, una herramienta, una decisión mejor.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 aurora opacity-70" aria-hidden />
        <div className="container py-16 sm:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">Sobre Techix</p>
            <h1 className="mt-4 text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl">
              IA con criterio, sin ruido
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              Techix nace de una idea simple: la Inteligencia Artificial avanza demasiado
              rápido y hay demasiado ruido. Nosotros filtramos, probamos y explicamos solo
              lo que importa.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Principios */}
      <section className="container mt-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="card flex flex-col gap-3 p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <p.icon className="h-5 w-5" />
              </span>
              <h2 className="text-base font-semibold text-fg">{p.title}</h2>
              <p className="text-sm leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Detalle */}
      <section className="container mt-16">
        <div className="prose-techix mx-auto max-w-prose">
          <h2>Qué hacemos</h2>
          <p>
            Cubrimos cuatro frentes: <strong>noticias</strong> que importan,{" "}
            <strong>herramientas</strong> que merecen tu tiempo, <strong>comparativas</strong>{" "}
            honestas y <strong>guías</strong> prácticas. No somos un periódico: somos un filtro.
          </p>
          <h2>Cómo trabajamos</h2>
          <p>
            Si algo no aporta, no lo publicamos. Preferimos dedicar más tiempo a menos cosas y
            que cada pieza valga la pena. Calidad sobre cantidad, siempre.
          </p>
          <blockquote>
            La mejor herramienta no es la más nueva, sino la que resuelve tu problema.
          </blockquote>
        </div>

        <div className="mt-12 text-center">
          <Link href="/contacto" className="btn-primary">¿Tienes una propuesta? Escríbenos</Link>
        </div>
      </section>
    </>
  );
}
