import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Marca "TK" de Techix, fiel al logotipo oficial.
 * - La "T" usa `currentColor` (se adapta al tema claro/oscuro).
 * - La "K" (chevron) mantiene el azul de marca.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="20 22 80 76"
      className={cn("h-7 w-7", className)}
      role="img"
      aria-label="Techix"
    >
      {/* T */}
      <path
        d="M24 26 H92 L80 46 H66 V80 Q66 95 53 95 Q48 95 48 88 V46 H24 Z"
        className="fill-current"
      />
      {/* K (chevron que abre hacia la derecha, vértice junto al asta de la T) */}
      <path
        d="M96 52 L70 73 L96 94 L96 82 L82 73 L96 64 Z"
        className="fill-accent"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Muestra el texto "Techix" junto a la marca */
  withWordmark?: boolean;
}

export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Techix — inicio"
      className={cn(
        "group inline-flex items-center gap-2.5 text-fg transition-opacity duration-200 hover:opacity-80",
        className,
      )}
    >
      <LogoMark className="h-8 w-8" />
      {withWordmark && (
        <span className="text-[1.35rem] font-semibold leading-none tracking-tight">
          Techix
        </span>
      )}
    </Link>
  );
}
