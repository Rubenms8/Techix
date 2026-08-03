"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  /** ID de slot de AdSense (data-ad-slot). */
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  className?: string;
  /** Altura mínima reservada para evitar saltos de layout (CLS). */
  minHeight?: number;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Bloque de publicidad NO intrusivo, preparado para Google AdSense.
 *
 * - No renderiza nada visible hasta que exista NEXT_PUBLIC_ADSENSE_CLIENT.
 * - Reserva espacio (min-height) para no provocar saltos de contenido (CLS).
 * - Diseño discreto, integrado con la estética del sitio y etiquetado como "Publicidad".
 *
 * El script principal de AdSense se carga una sola vez en el layout (ver AdSenseScript).
 */
export function AdSlot({
  slot,
  format = "auto",
  className,
  minHeight = 250,
  label = "Publicidad",
}: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const ref = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!client || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense aún no está disponible; se reintentará al recargar. */
    }
  }, [client, slot]);

  // Sin cliente configurado o sin slot: no mostramos absolutamente nada.
  if (!client || !slot) return null;

  return (
    <aside
      className={cn(
        "not-prose mx-auto w-full overflow-hidden rounded-xl border border-dashed border-border bg-surface/60",
        className,
      )}
      aria-label={label}
    >
      <p className="px-3 pt-2 text-[10px] font-medium uppercase tracking-wider text-subtle">
        {label}
      </p>
      <div style={{ minHeight }} className="px-3 pb-3">
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
