"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchIcon, MenuIcon, CloseIcon } from "./icons";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Atajo "/" para saltar al buscador (si no se está escribiendo en un campo)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      const typing =
        el instanceof HTMLElement &&
        (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (typing) return;
      e.preventDefault();
      router.push("/buscar");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Bloquea el scroll del body con el menú móvil abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-smooth",
        scrolled
          ? "border-b border-border bg-bg/75 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/60"
          : "border-b border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Principal">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-px h-px origin-center bg-accent transition-transform duration-300 ease-smooth",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/buscar"
            className="hidden h-9 items-center gap-2 rounded-full border border-border bg-elevated pl-3 pr-2 text-sm text-muted transition-colors duration-200 hover:border-border-strong hover:text-fg sm:inline-flex"
          >
            <SearchIcon className="h-4 w-4" />
            <span>Buscar</span>
            <kbd className="ml-1 hidden rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-subtle lg:inline">
              /
            </kbd>
          </Link>

          <Link
            href="/buscar"
            aria-label="Buscar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-elevated text-muted transition-colors duration-200 hover:border-border-strong hover:text-fg sm:hidden"
          >
            <SearchIcon className="h-4 w-4" />
          </Link>

          <ThemeToggle />

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-elevated text-muted transition-colors hover:text-fg md:hidden"
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          "overflow-hidden border-border bg-bg/95 backdrop-blur-xl md:hidden transition-[max-height,opacity] duration-300 ease-smooth",
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container flex flex-col gap-1 py-4" aria-label="Móvil">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-medium transition-colors",
                  active ? "bg-surface text-fg" : "text-muted hover:bg-surface hover:text-fg",
                )}
              >
                {item.label}
                <span className={cn("h-1.5 w-1.5 rounded-full bg-accent transition-opacity", active ? "opacity-100" : "opacity-0")} />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
