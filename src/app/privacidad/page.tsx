import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Política de privacidad de ${siteConfig.name}: qué datos tratamos, con qué fin, cookies, publicidad de terceros (Google AdSense) y cómo ejercer tus derechos.`,
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="container py-16 sm:py-20">
      <div className="mx-auto max-w-prose">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-balance text-[2rem] font-semibold tracking-tight text-fg sm:text-[2.5rem]">
          Política de Privacidad
        </h1>
        <p className="mt-3 text-sm text-subtle">Última actualización: 2 de agosto de 2026</p>

        <div className="prose-techix mt-10">
          <p>
            En <strong>{siteConfig.name}</strong> respetamos tu privacidad y nos comprometemos a
            proteger los datos personales de quienes visitan este sitio web. Esta política explica,
            de forma clara, qué información tratamos, con qué finalidad y cuáles son tus derechos.
          </p>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos es la entidad titular de {siteConfig.name}.
            Puedes ponerte en contacto con nosotros para cualquier cuestión relativa a la privacidad
            a través de nuestra <Link href="/contacto">página de contacto</Link>.
          </p>

          <h2>2. Qué datos tratamos</h2>
          <p>Para navegar por {siteConfig.name} no necesitas registrarte ni facilitar datos personales. No obstante, podemos tratar la siguiente información:</p>
          <ul>
            <li>
              <strong>Datos que nos facilitas voluntariamente:</strong> si nos escribes a través del
              formulario de contacto o te suscribes a la newsletter, tratamos los datos que nos
              proporciones (como tu nombre o correo electrónico) con el único fin de atender tu
              solicitud o enviarte contenido.
            </li>
            <li>
              <strong>Datos de navegación:</strong> como la mayoría de webs, recopilamos de forma
              automática información técnica (dirección IP, tipo de navegador, páginas visitadas)
              mediante cookies y tecnologías similares, principalmente con fines estadísticos.
            </li>
          </ul>

          <h2>3. Con qué finalidad y base legal</h2>
          <ul>
            <li><strong>Prestar el servicio</strong> y mostrar el contenido correctamente (interés legítimo).</li>
            <li><strong>Atender tus consultas</strong> enviadas por el formulario de contacto (consentimiento).</li>
            <li><strong>Enviar la newsletter</strong>, si te suscribes, hasta que te des de baja (consentimiento).</li>
            <li><strong>Analizar el uso del sitio</strong> de forma agregada para mejorarlo (consentimiento, vía cookies).</li>
            <li><strong>Mostrar publicidad</strong> a través de terceros como Google, cuando esté activa (consentimiento).</li>
          </ul>

          <h2>4. Cookies</h2>
          <p>
            Utilizamos cookies propias y de terceros. Puedes conocer el detalle y gestionar tus
            preferencias en nuestra <Link href="/cookies">Política de Cookies</Link>, así como
            aceptar, rechazar o configurar su uso desde el panel de consentimiento del sitio.
          </p>

          <h2>5. Publicidad de terceros (Google AdSense)</h2>
          <p>
            Este sitio puede mostrar anuncios servidos por proveedores de terceros, incluido
            <strong> Google</strong>, a través de Google AdSense. Ten en cuenta lo siguiente:
          </p>
          <ul>
            <li>
              Los proveedores externos, incluido Google, utilizan <strong>cookies</strong> para
              mostrar anuncios basados en tus visitas anteriores a este y otros sitios web.
            </li>
            <li>
              El uso de cookies de publicidad por parte de Google permite a la empresa y a sus
              socios mostrar anuncios basados en tu actividad de navegación.
            </li>
            <li>
              Puedes <strong>inhabilitar la publicidad personalizada</strong> en la{" "}
              <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer noopener nofollow">
                configuración de anuncios de Google
              </a>
              . También puedes gestionar las cookies de terceros en{" "}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer noopener nofollow">
                aboutads.info/choices
              </a>{" "}
              y{" "}
              <a href="https://www.youronlinechoices.com/" target="_blank" rel="noreferrer noopener nofollow">
                youronlinechoices.com
              </a>
              .
            </li>
          </ul>

          <h2>6. Con quién compartimos los datos</h2>
          <p>
            No vendemos tus datos personales. Podemos utilizar proveedores de servicios (como
            plataformas de analítica web, envío de correo o publicidad) que actúan como encargados
            del tratamiento y que tratan la información conforme a sus propias políticas y a la
            normativa aplicable. Algunos de estos proveedores pueden estar ubicados fuera del Espacio
            Económico Europeo, aplicándose en tal caso las garantías legalmente exigidas.
          </p>

          <h2>7. Conservación de los datos</h2>
          <p>
            Conservamos los datos únicamente durante el tiempo necesario para la finalidad para la
            que se recogieron y mientras exista una obligación legal de conservarlos. Los datos de la
            newsletter se conservan hasta que solicitas la baja.
          </p>

          <h2>8. Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
            portabilidad de tus datos, así como retirar tu consentimiento en cualquier momento,
            escribiéndonos a través de la <Link href="/contacto">página de contacto</Link>. También
            tienes derecho a presentar una reclamación ante la autoridad de control competente.
          </p>

          <h2>9. Menores de edad</h2>
          <p>
            Este sitio no está dirigido a menores de edad y no recopilamos de forma consciente datos
            de menores. Si crees que un menor nos ha facilitado datos, contáctanos para eliminarlos.
          </p>

          <h2>10. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política para adaptarla a cambios legales o del servicio.
            Publicaremos cualquier modificación en esta misma página, indicando la fecha de la última
            actualización.
          </p>
        </div>
      </div>
    </section>
  );
}
