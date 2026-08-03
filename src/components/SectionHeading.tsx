import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-10 flex gap-4",
        centered ? "flex-col items-center text-center" : "items-end justify-between",
        className,
      )}
    >
      <div className={cn(centered && "max-w-2xl")}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-[2.1rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-pretty leading-relaxed text-muted">{description}</p>
        )}
      </div>
      {action && !centered && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          {action.label}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
