"use client";

import { useState } from "react";
import { CheckIcon, ArrowRightIcon } from "./icons";
import { siteConfig } from "@/lib/site";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    const body = `Quiero suscribirme a la newsletter de ${siteConfig.name} con este correo: ${email.trim()}`;
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      "Alta en la newsletter",
    )}&body=${encodeURIComponent(body)}`;
    setStatus("ok");
  }

  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-elevated px-6 py-14 sm:px-12 sm:py-16">
        {/* Glow de marca */}
        <div className="pointer-events-none absolute inset-0 aurora opacity-80" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Newsletter</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-[2.25rem]">
            La IA que importa, una vez por semana
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-muted">
            Sin spam ni relleno. Solo lo esencial: lo que ha pasado, qué probar y por qué.
          </p>

          {status === "ok" ? (
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-2 text-sm font-medium text-accent">
              <CheckIcon className="h-4 w-4" />
              ¡Gracias! Se ha abierto tu correo para completar el alta.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="h-11 flex-1 rounded-full border border-border bg-bg px-5 text-sm text-fg placeholder:text-subtle transition-colors focus:border-accent/50"
              />
              <button type="submit" className="btn-primary shrink-0">
                Suscribirme
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-subtle">Puedes darte de baja cuando quieras.</p>
        </div>
      </div>
    </section>
  );
}
