import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: `Aviso legal y condiciones de uso de ${siteConfig.name}: titularidad, propiedad intelectual, uso del sitio y exención de responsabilidad sobre el contenido.`,
  alternates: { canonical: "/aviso-legal" },
  robots: { index: true, follow: true },
};

export default function LegalNoticePage() {
  return (
    <section className="container py-16 sm:py-20">
      <div className="mx-auto max-w-prose">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-balance text-[2rem] font-semibold tracking-tight text-fg sm:text-[2.5rem]">
          Aviso Legal
        </h1>
        <p className="mt-3 text-sm text-subtle">Última actualización: 2 de agosto de 2026</p>

        <div className="prose-techix mt-10">
          <h2>1. Información general</h2>
          <p>
            El presente aviso legal regula el uso del sitio web <strong>{siteConfig.name}</strong>, un
            medio digital independiente dedicado a la divulgación sobre inteligencia artificial:
            noticias, herramientas, comparativas y guías. El acceso y la navegación por este sitio
            implican la aceptación de las condiciones recogidas en este aviso legal.
          </p>

          <h2>2. Objeto del sitio</h2>
          <p>
            {siteConfig.name} tiene una finalidad puramente informativa y divulgativa. Su objetivo es
            ayudar a los lectores a entender y aprovechar la inteligencia artificial mediante
            contenido original, útil y verificado con criterio.
          </p>

          <h2>3. Propiedad intelectual</h2>
          <p>
            Los textos, la estructura, el diseño y los elementos de marca de {siteConfig.name} son
            propiedad de su titular o se utilizan con la debida autorización, y están protegidos por
            la normativa de propiedad intelectual. No está permitida su reproducción total o parcial
            sin autorización, salvo cita con atribución y enlace a la fuente.
          </p>
          <p>
            Las imágenes de portada proceden de bancos de imágenes libres de derechos (como Pexels) y
            se utilizan conforme a sus respectivas licencias, con atribución a sus autores cuando así
            se requiere. Las marcas, nombres comerciales y logotipos de terceros que puedan aparecer
            pertenecen a sus respectivos propietarios y se mencionan de forma informativa y
            nominativa, sin que ello implique relación, patrocinio o respaldo alguno.
          </p>

          <h2>4. Condiciones de uso</h2>
          <p>Al utilizar este sitio, el usuario se compromete a:</p>
          <ul>
            <li>Hacer un uso lícito y adecuado del contenido y los servicios.</li>
            <li>No realizar acciones que puedan dañar, sobrecargar o inutilizar el sitio.</li>
            <li>No emplear el contenido con fines ilícitos o contrarios a la buena fe.</li>
          </ul>

          <h2>5. Exención de responsabilidad</h2>
          <p>
            El contenido de {siteConfig.name} tiene carácter <strong>meramente informativo</strong> y
            no constituye asesoramiento profesional de ningún tipo (financiero, legal, médico, fiscal
            ni de otra índole). Antes de tomar decisiones basadas en la información aquí publicada, te
            recomendamos verificarla y, si procede, consultar con un profesional cualificado.
          </p>
          <p>
            Aunque procuramos que la información sea correcta y esté actualizada, el sector de la
            inteligencia artificial evoluciona muy rápido: características, precios y disponibilidad de
            las herramientas mencionadas pueden cambiar. No garantizamos la exactitud, integridad o
            vigencia absoluta de todos los contenidos, ni nos hacemos responsables de las decisiones
            que se tomen a partir de ellos.
          </p>

          <h2>6. Enlaces externos</h2>
          <p>
            Este sitio puede contener enlaces a webs de terceros. No tenemos control sobre dichos
            sitios ni respondemos de sus contenidos, políticas o prácticas. La inclusión de un enlace
            no implica respaldo. Te recomendamos revisar las condiciones y políticas de privacidad de
            cualquier sitio de terceros que visites.
          </p>

          <h2>7. Publicidad</h2>
          <p>
            Este sitio puede incluir espacios publicitarios servidos por terceros. Puedes consultar
            cómo se tratan las cookies publicitarias en nuestra{" "}
            <Link href="/cookies">Política de Cookies</Link> y{" "}
            <Link href="/privacidad">Política de Privacidad</Link>.
          </p>

          <h2>8. Legislación aplicable</h2>
          <p>
            Las presentes condiciones se rigen por la legislación aplicable en materia de servicios de
            la sociedad de la información y protección de datos. Cualquier controversia se someterá a
            los tribunales que resulten competentes conforme a derecho.
          </p>

          <h2>9. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con este aviso legal, puedes escribirnos a través de
            la <Link href="/contacto">página de contacto</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
