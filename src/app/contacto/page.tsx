import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import {
  SignalIcon,
  FilterIcon,
  BoltIcon,
  MailIcon,
  TikTokIcon,
  InstagramIcon,
  ArrowUpRightIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Ponte en contacto con el equipo de ${siteConfig.name}. Propuestas, correcciones, sugerencias o cualquier consulta: leemos todos los mensajes.`,
  alternates: { canonical: "/contacto" },
};

const reasons = [
  { icon: SignalIcon, text: "Sugerir un tema o una herramienta para analizar" },
  { icon: FilterIcon, text: "Corregir o matizar algo que hayamos publicado" },
  { icon: BoltIcon, text: "Colaboraciones, prensa u otras propuestas" },
];

export default function ContactPage() {
  return (
    <section className="container py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow justify-center">Contacto</p>
          <h1 className="mt-3 text-balance text-[2rem] font-semibold tracking-tight text-fg sm:text-[2.5rem]">
            Hablemos
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            ¿Tienes una propuesta, una corrección o quieres que analicemos una herramienta?
            Escríbenos con el formulario. Leemos todos los mensajes.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {reasons.map((r) => (
            <span key={r.text} className="inline-flex items-center gap-2 text-sm text-muted">
              <r.icon className="h-4 w-4 text-accent" />
              {r.text}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-elevated p-6 sm:p-8">
          <ContactForm />
        </div>

        {/* Otras formas de contacto */}
        <div className="mx-auto mt-12 max-w-2xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-subtle">
            También puedes encontrarnos aquí
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <ContactMethod
              href={`mailto:${siteConfig.contact.email}`}
              label="Correo"
              value={siteConfig.contact.email}
              icon={<MailIcon className="h-5 w-5" />}
            />
            <ContactMethod
              href={siteConfig.contact.tiktok}
              label="TikTok"
              value="@techixai"
              icon={<TikTokIcon className="h-5 w-5" />}
              external
            />
            <ContactMethod
              href={siteConfig.contact.instagram}
              label="Instagram"
              value="@techixai"
              icon={<InstagramIcon className="h-5 w-5" />}
              external
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactMethod({
  href,
  label,
  value,
  icon,
  external,
}: {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group relative flex flex-col items-center gap-2 rounded-2xl border border-border bg-elevated p-5 text-center transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft"
    >
      {external && (
        <ArrowUpRightIcon className="absolute right-3 top-3 h-4 w-4 text-subtle transition-colors group-hover:text-accent" />
      )}
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
        {icon}
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-subtle">{label}</span>
      <span className="break-all text-sm font-medium text-fg transition-colors group-hover:text-accent">
        {value}
      </span>
    </a>
  );
}

