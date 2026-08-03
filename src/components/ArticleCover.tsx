import type { CategorySlug } from "@/lib/types";
import { cn, hashString } from "@/lib/utils";
import { CategoryIcon } from "./icons";

/** Acento de color por categoría — paleta fría y coherente con la marca. */
const coverAccent: Record<CategorySlug, string> = {
  noticias: "222 100% 62%",
  comparativas: "255 92% 70%",
  herramientas: "190 96% 55%",
  guias: "210 96% 64%",
};

interface ArticleCoverProps {
  category: CategorySlug;
  /** Semilla (slug) para variar sutilmente cada portada sin romper la coherencia. */
  seed?: string;
  className?: string;
  /** Tamaño del icono focal central. */
  iconSize?: number;
  /** Muestra el sello "Techix" (desactívalo en miniaturas pequeñas). */
  brand?: boolean;
}

/**
 * Portada generada para artículos: fondo navy de marca + glow por categoría +
 * rejilla técnica + icono de categoría. Coherente en toda la web, sin ficheros externos.
 * Siempre en tonos oscuros: funciona como una miniatura de revista premium.
 */
export function ArticleCover({
  category,
  seed = category,
  className,
  iconSize = 30,
  brand = true,
}: ArticleCoverProps) {
  const h = hashString(seed);
  const accent = coverAccent[category] ?? coverAccent.noticias;
  const gx = 22 + (h % 56); // posición X del glow (%)
  const gy = 14 + ((h >> 3) % 46); // posición Y del glow (%)
  const rot = (h % 22) - 11; // rotación de la marca de agua

  return (
    <div className={cn("relative overflow-hidden bg-[#0b1220]", className)}>
      {/* Degradado base */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 120% at 50% -10%, #16233f 0%, #0b1220 58%)" }}
      />
      {/* Rejilla técnica */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(120% 100% at 50% 0%, #000 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 55%, transparent 100%)",
        }}
      />
      {/* Glow de marca por categoría */}
      <div
        className="absolute h-2/3 w-2/3 rounded-full blur-[54px]"
        style={{
          background: `radial-gradient(circle, hsl(${accent} / 0.5), transparent 70%)`,
          left: `${gx}%`,
          top: `${gy}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Marca de agua: icono grande de la categoría */}
      <CategoryIcon
        slug={category}
        strokeWidth={1}
        className="absolute -bottom-8 -right-7 h-40 w-40 text-white/[0.06]"
        style={{ transform: `rotate(${rot}deg)` }}
      />
      {/* Icono focal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm"
          style={{ width: iconSize * 2, height: iconSize * 2, color: `hsl(${accent})` }}
        >
          <CategoryIcon slug={category} style={{ width: iconSize, height: iconSize }} />
        </span>
      </div>
      {/* Sello de marca */}
      {brand && (
        <span className="absolute bottom-2.5 right-3 text-[10px] font-semibold tracking-wide text-white/35">
          Techix
        </span>
      )}
    </div>
  );
}
