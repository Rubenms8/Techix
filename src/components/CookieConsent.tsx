"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Banner de consentimiento de cookies (RGPD) integrado con Google Consent Mode v2.
 * Aceptar / Rechazar / Configurar preferencias. Guarda la elección en localStorage
 * y actualiza el consentimiento de Google (si gtag está presente).
 */

type Consent = { analytics: boolean; ads: boolean };
const STORAGE_KEY = "techix-cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function applyConsent(c: Consent) {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: c.analytics ? "granted" : "denied",
      ad_storage: c.ads ? "granted" : "denied",
      ad_user_data: c.ads ? "granted" : "denied",
      ad_personalization: c.ads ? "granted" : "denied",
    });
  }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setOpen(true);
      } else {
        applyConsent(JSON.parse(saved) as Consent);
      }
    } catch {
      setOpen(true);
    }

    const reopen = () => {
      setShowPrefs(true);
      setOpen(true);
    };
    window.addEventListener("techix:cookie-preferences", reopen);
    return () => window.removeEventListener("techix:cookie-preferences", reopen);
  }, []);

  const save = useCallback((c: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      /* almacenamiento no disponible */
    }
    applyConsent(c);
    setOpen(false);
    setShowPrefs(false);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:p-5"
      role="dialog"
      aria-modal="false"
      aria-label="Consentimiento de cookies"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-elevated shadow-lift">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent sm:flex">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
                <path d="M8.5 10.5h.01M12 15h.01M15.5 11.5h.01M9.5 14h.01" />
              </svg>
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-semibold tracking-tight text-fg">Tu privacidad es lo primero</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Usamos cookies propias y de terceros para que el sitio funcione, analizar el tráfico
                de forma anónima y, en el futuro, mostrar publicidad. Puedes aceptarlas todas,
                rechazarlas o elegir. Más información en la{" "}
                <Link href="/cookies" className="font-medium text-accent underline-offset-4 hover:underline">
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
          </div>

          {showPrefs && (
            <div className="mt-4 space-y-2.5 rounded-xl border border-border bg-surface p-4">
              <PrefRow
                title="Necesarias"
                desc="Imprescindibles para el funcionamiento del sitio. Siempre activas."
                checked
                disabled
              />
              <PrefRow
                title="Analíticas"
                desc="Nos ayudan a entender, de forma anónima, cómo se usa la web para mejorarla."
                checked={analytics}
                onChange={setAnalytics}
              />
              <PrefRow
                title="Publicidad"
                desc="Permiten mostrar anuncios relevantes (Google y sus socios) cuando se activen."
                checked={ads}
                onChange={setAds}
              />
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
            {!showPrefs && (
              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                className="btn-secondary w-full sm:w-auto"
              >
                Configurar
              </button>
            )}
            <button
              type="button"
              onClick={() => save({ analytics: false, ads: false })}
              className="btn-secondary w-full sm:w-auto"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() =>
                showPrefs ? save({ analytics, ads }) : save({ analytics: true, ads: true })
              }
              className="btn-primary w-full sm:w-auto"
            >
              {showPrefs ? "Guardar preferencias" : "Aceptar todo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrefRow({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-fg">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-accent" : "bg-border-strong",
          disabled && "opacity-60",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
            checked ? "translate-x-[22px]" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}
