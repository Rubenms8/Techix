import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f1b2d",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#0b1524",
              border: "1px solid #22314a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="44" height="44" viewBox="20 22 80 76">
              <path d="M24 26 H92 L80 46 H66 V80 Q66 95 53 95 Q48 95 48 88 V46 H24 Z" fill="#ffffff" />
              <path d="M96 52 L70 73 L96 94 L96 82 L82 73 L96 64 Z" fill="#2f6bff" />
            </svg>
          </div>
          <div style={{ color: "#ffffff", fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>
            Techix
          </div>
        </div>

        {/* Titular */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Inteligencia Artificial,{" "}
            <span style={{ color: "#4c84ff" }}>con criterio</span>
          </div>
          <div style={{ color: "#9fb0c9", fontSize: 30, maxWidth: 820 }}>
            Noticias, herramientas, comparativas y guías. Sin ruido.
          </div>
        </div>

        {/* Pie */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ height: 4, width: 56, background: "#2f6bff", borderRadius: 2 }} />
          <div style={{ color: "#6b7d99", fontSize: 24 }}>techix.es</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
