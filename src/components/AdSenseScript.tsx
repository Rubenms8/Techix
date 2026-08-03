import Script from "next/script";

/**
 * Carga el script global de Google AdSense una sola vez.
 * Solo se inyecta si NEXT_PUBLIC_ADSENSE_CLIENT está configurado,
 * de modo que en desarrollo (o antes de la aprobación) no carga nada.
 */
export function AdSenseScript() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
    />
  );
}
