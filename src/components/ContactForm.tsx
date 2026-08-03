"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok">("idle");
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) return;
    const subject = form.asunto.trim() || `Contacto de ${form.nombre.trim()}`;
    const body = `Nombre: ${form.nombre.trim()}\nCorreo: ${form.email.trim()}\n\n${form.mensaje.trim()}`;
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent-soft p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-fg">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-lg font-semibold text-fg">Ya casi está</h2>
        <p className="mt-1.5 text-sm text-muted">
          Se ha abierto tu aplicación de correo con el mensaje listo para enviar. Si no se abre,
          escríbenos directamente a{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "h-11 w-full rounded-lg border border-border bg-bg px-4 text-sm text-fg placeholder:text-subtle transition-colors focus:border-accent/50";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-fg">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Tu nombre"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-fg">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="tu@correo.com"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="asunto" className="mb-1.5 block text-sm font-medium text-fg">
          Asunto
        </label>
        <input
          id="asunto"
          type="text"
          value={form.asunto}
          onChange={(e) => setForm({ ...form, asunto: e.target.value })}
          placeholder="¿Sobre qué nos escribes?"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-fg">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          required
          rows={6}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          placeholder="Cuéntanos en qué podemos ayudarte…"
          className="w-full resize-y rounded-lg border border-border bg-bg px-4 py-3 text-sm text-fg placeholder:text-subtle transition-colors focus:border-accent/50"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-subtle">
          Al enviar aceptas nuestra{" "}
          <a href="/privacidad" className="text-accent underline-offset-4 hover:underline">
            Política de Privacidad
          </a>
          .
        </p>
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Enviar mensaje
        </button>
      </div>
    </form>
  );
}
