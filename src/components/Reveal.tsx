"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode, type Ref } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo en ms para escalonar apariciones */
  delay?: number;
  as?: ElementType;
}

/**
 * Fade + subida sutil cuando el elemento entra en el viewport.
 * Robusto: revela de inmediato lo que ya está a la vista, respeta
 * `prefers-reduced-motion` y NUNCA deja el contenido oculto (salvavidas).
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    // Sin animación si el usuario la ha desactivado.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // Si ya está (parcialmente) en pantalla al cargar, revélalo enseguida.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );
    observer.observe(el);

    // Salvavidas: pase lo que pase (scroll instantáneo, observer que no dispara…),
    // el contenido se muestra. Nunca queda oculto.
    const safety = window.setTimeout(show, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}
