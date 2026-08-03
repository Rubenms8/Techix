import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { categories } from "@/lib/categories";
import { Logo } from "./Logo";
import { CategoryIcon, TikTokIcon, InstagramIcon, MailIcon } from "./icons";
import { CookiePreferencesLink } from "./CookiePreferencesLink";

const linkClass = "text-sm text-muted transition-colors duration-200 hover:text-fg";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-elevated text-muted transition-colors duration-200 hover:border-border-strong hover:text-accent"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 border-t border-border bg-surface">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">{siteConfig.description}</p>
            <div className="mt-6 flex items-center gap-2">
              <SocialLink href={siteConfig.contact.tiktok} label="Techix en TikTok">
                <TikTokIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={siteConfig.contact.instagram} label="Techix en Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={`mailto:${siteConfig.contact.email}`} label="Escríbenos por correo">
                <MailIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">Explorar</h3>
            <ul className="mt-4 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categoria/${c.slug}`} className={`group inline-flex items-center gap-2 ${linkClass}`}>
                    <CategoryIcon slug={c.slug} className="h-4 w-4 text-subtle transition-colors group-hover:text-accent" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">Techix</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/sobre" className={linkClass}>Sobre nosotros</Link></li>
              <li><Link href="/contacto" className={linkClass}>Contacto</Link></li>
              <li><Link href="/etiquetas" className={linkClass}>Temas</Link></li>
              <li><Link href="/buscar" className={linkClass}>Buscar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/aviso-legal" className={linkClass}>Aviso Legal</Link></li>
              <li><Link href="/privacidad" className={linkClass}>Política de Privacidad</Link></li>
              <li><Link href="/cookies" className={linkClass}>Política de Cookies</Link></li>
              <li><CookiePreferencesLink className={`${linkClass} text-left`} /></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-subtle">
            © {year} Techix. Inteligencia Artificial, con criterio.
          </p>
          <p className="text-xs text-subtle">Contenido informativo. Hecho con precisión, no con prisa.</p>
        </div>
      </div>
    </footer>
  );
}
