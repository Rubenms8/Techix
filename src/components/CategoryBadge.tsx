import Link from "next/link";
import { getCategory } from "@/lib/categories";
import type { CategorySlug } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "./icons";

interface CategoryBadgeProps {
  category: CategorySlug;
  className?: string;
  asLink?: boolean;
  overlay?: boolean;
  withIcon?: boolean;
}

export function CategoryBadge({
  category,
  className,
  asLink = true,
  overlay = false,
  withIcon = false,
}: CategoryBadgeProps) {
  const cat = getCategory(category);
  if (!cat) return null;

  const base = cn(
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
    overlay
      ? "bg-[hsl(var(--navy))] text-white ring-1 ring-white/15 backdrop-blur-sm"
      : "border border-accent/25 bg-accent-soft text-accent",
    asLink && !overlay && "hover:border-accent/50 hover:bg-accent/15",
    className,
  );

  const content = (
    <>
      {withIcon && <CategoryIcon slug={cat.slug} className="h-3.5 w-3.5" />}
      {cat.short}
    </>
  );

  if (!asLink) {
    return <span className={base}>{content}</span>;
  }

  return (
    <Link href={`/categoria/${cat.slug}`} className={base}>
      {content}
    </Link>
  );
}
