import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: `Política de cookies de ${siteConfig.name}: qué son, qué tipos usamos (necesarias, analíticas y publicitarias), las de Google AdSense y cómo gestionarlas o desactivarlas.`,
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <section className="container py-16 sm:py-20">
      <div className="mx-auto max-w-prose">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-balance text-[2rem] font-semibold tracking-tight text-fg sm:text-[2.5rem]">
          Política de Cookies
        </h1>
        <p className="mt-3 text-sm text-subtle">Última actualización: 2 de agosto de 2026</p>

        <div className="prose-techix mt-10">
          <p>
            Esta Política de Cookies explica qué son las cookies, cuáles utiliza{" "}
            <strong>{siteConfig.name}</strong> y cómo puedes gestionarlas. Al usar este sitio, y según
            la opción que elijas en nuestro panel de consentimiento, aceptas el uso de cookies
            conforme a lo aquí descrito.
          </p>

          <h2>1. Qué son las cookies</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo
            cuando los visitas. Sirven para que la web funcione, para recordar tus preferencias y
            para obtener información estadística o publicitaria.
          </p>

          <h2>2. Tipos de cookies que utilizamos</h2>
          <ul>
            <li>
              <strong>Necesarias (técnicas):</strong> imprescindibles para el funcionamiento del
              sitio (por ejemplo, recordar tu preferencia de consentimiento o el tema claro/oscuro).
              No requieren consentimiento.
            </li>
            <li>
              <strong>Analíticas:</strong> nos permiten conocer, de forma anónima y agregada, cómo se
              usa la web (páginas más visitadas, tiempo de permanencia) para mejorarla.
            </li>
            <li>
              <strong>Publicitarias:</strong> permiten mostrar anuncios y medir su rendimiento. Se
              activan solo si las aceptas y cuando la publicidad esté habilitada en el sitio.
            </li>
          </ul>

          <h2>3. Cookies de terceros (Google AdSense y otros)</h2>
          <p>
            Cuando la publicidad esté activa, este sitio podrá utilizar cookies de terceros,
            principalmente de <strong>Google</strong> a través de Google AdSense. Google y sus socios
            usan cookies para mostrar anuncios basados en tus visitas anteriores a este y otros
            sitios. Puedes obtener más información y desactivar la publicidad personalizada en:
          </p>
          <ul>
            <li>
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer noopener nofollow">
                Cómo usa Google las cookies en la publicidad
              </a>
            </li>
            <li>
              <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer noopener nofollow">
                Configuración de anuncios de Google
              </a>
            </li>
            <li>
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer noopener nofollow">
                aboutads.info/choices
              </a>{" "}
              y{" "}
              <a href="https://www.youronlinechoices.com/" target="_blank" rel="noreferrer noopener nofollow">
                youronlinechoices.com
              </a>
            </li>
          </ul>

          <h2>4. Cómo gestionar o desactivar las cookies</h2>
          <p>Tienes varias formas de controlar las cookies:</p>
          <ul>
            <li>
              Desde nuestro <strong>panel de consentimiento</strong>: puedes cambiar tu decisión
              cuando quieras haciendo clic en{" "}
              <CookiePreferencesLink className="font-medium text-accent underline-offset-4 hover:underline" />.
            </li>
            <li>
              Desde la <strong>configuración de tu navegador</strong>: puedes bloquear o eliminar las
              cookies. Ten en cuenta que desactivar algunas puede afectar al funcionamiento del sitio.
            </li>
          </ul>
          <p>
            Consulta cómo hacerlo en tu navegador:{" "}
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer noopener nofollow">Chrome</a>,{" "}
            <a href="https://support.mozilla.org/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noreferrer noopener nofollow">Firefox</a>,{" "}
            <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer noopener nofollow">Safari</a>{" "}
            o{" "}
            <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer noopener nofollow">Edge</a>.
          </p>

          <h2>5. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta Política de Cookies. Publicaremos cualquier cambio en esta página.
            Para más información sobre el tratamiento de tus datos, consulta nuestra{" "}
            <Link href="/privacidad">Política de Privacidad</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
