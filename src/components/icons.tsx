import type { SVGProps } from "react";
import type { CategorySlug } from "@/lib/types";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------- UI ---------- */
export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </Base>
);
export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
export const ArrowUpRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);
export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);
export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);
export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Base>
);
export const MoonIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Base>
);
export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Base>
);
export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Base>
);

/* ---------- Marcas (relleno) ---------- */
export const TikTokIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M16.5 3c.4 2.3 1.7 3.7 3.9 3.9v3c-1.4 0-2.7-.4-3.9-1.1v6.6a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1a2.9 2.9 0 1 0 2 2.7V3h3Z" />
  </svg>
);
export const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/* ---------- Categorías ---------- */
export const NewsIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5h13v14H5a1 1 0 0 1-1-1V5Z" />
    <path d="M17 8h2.5A1.5 1.5 0 0 1 21 9.5V17a2 2 0 0 1-2 2" />
    <path d="M8 9h5M8 13h5M8 17h3" />
  </Base>
);
export const ToolIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
    <path d="M12 12 4 7.5M12 12v9M12 12l8-4.5" />
  </Base>
);
export const CompareIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v18" />
    <path d="M6 7 3 13h6L6 7ZM18 7l-3 6h6l-3-6Z" />
    <path d="M4 20h16" />
  </Base>
);
export const GuideIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z" />
    <path d="M12 4h6.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H12" />
  </Base>
);

/* ---------- Propuesta de valor ---------- */
export const SignalIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12a7 7 0 0 1 7-7M5 16a11 11 0 0 1 11-11" />
    <circle cx="6" cy="18" r="1.4" fill="currentColor" stroke="none" />
  </Base>
);
export const FilterIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5h16l-6.5 8v5l-3 1.5V13L4 5Z" />
  </Base>
);
export const BoltIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
  </Base>
);

const categoryIcons: Record<CategorySlug, (p: IconProps) => JSX.Element> = {
  noticias: NewsIcon,
  herramientas: ToolIcon,
  comparativas: CompareIcon,
  guias: GuideIcon,
};

export function CategoryIcon({ slug, ...props }: IconProps & { slug: CategorySlug }) {
  const Icon = categoryIcons[slug] ?? NewsIcon;
  return <Icon {...props} />;
}
