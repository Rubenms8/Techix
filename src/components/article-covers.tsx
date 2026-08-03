import type { ReactNode } from "react";
import type { CategorySlug } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArticleCover } from "./ArticleCover";

/**
 * Portadas editoriales por tema: estilo de casa Techix (navy + azul de marca,
 * panel acristalado, rejilla técnica) con motivos y nombres de marca relevantes
 * a cada artículo. Coherentes entre sí para reforzar la identidad de la web.
 */

const ACCENT = "#5b8bff";

/* ---------- Piezas compartidas ---------- */

function CoverBase({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  /** Retrocompat: aceptado pero ya no se muestra (la categoría la marca la tarjeta). */
  kicker?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0b1220]", className)}>
      {/* Degradado base */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 120% at 50% -10%, #17253f 0%, #0b1220 60%)" }}
      />
      {/* Rejilla técnica */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(120% 100% at 50% 0%, #000 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 55%, transparent 100%)",
        }}
      />
      {/* Glow de marca */}
      <div
        className="absolute left-1/2 top-[-12%] h-[70%] w-[75%] -translate-x-1/2 rounded-full blur-[55px]"
        style={{ background: "radial-gradient(circle, rgba(47,107,255,.45), transparent 70%)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">{children}</div>
      <span className="absolute bottom-3 right-4 z-10 text-[11px] font-bold tracking-wide text-white/35">
        Techix
      </span>
    </div>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm",
        className,
      )}
      style={{ boxShadow: "0 24px 60px -24px rgba(0,0,0,.7), inset 0 1px 0 0 rgba(255,255,255,.06)" }}
    >
      {children}
    </div>
  );
}

function Chip({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[12px] font-semibold backdrop-blur-sm",
        active
          ? "border-[#5b8bff]/50 bg-[#2f6bff]/20 text-white"
          : "border-white/12 bg-white/[0.06] text-white/85",
      )}
    >
      {children}
    </span>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="h-2 w-2 rounded-full" style={{ background: color }} />;
}

function Scene({ children }: { children: ReactNode }) {
  return <div className="flex flex-col items-center gap-4">{children}</div>;
}

/* ---------- Escenas por artículo ---------- */

function CompareCover({ className }: { className?: string }) {
  const models = [
    { name: "ChatGPT", c: "#19c37d" },
    { name: "Gemini", c: "#5b8bff" },
    { name: "Claude", c: "#d97757" },
  ];
  return (
    <CoverBase className={className} kicker="Comparativa">
      <div className="flex items-end gap-3">
        {models.map((m, i) => (
          <div key={m.name} className="flex flex-col items-center gap-2">
            <Panel className={cn("h-16 w-24 flex-col gap-1.5", i === 1 && "h-20")}>
              <span className="h-3 w-3 rounded-full" style={{ background: m.c }} />
              <span className="text-[12px] font-semibold text-white/90">{m.name}</span>
            </Panel>
          </div>
        ))}
      </div>
    </CoverBase>
  );
}

function VideoCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Vídeo IA">
      <Scene>
        <Panel className="h-24 w-40">
          <svg viewBox="0 0 24 24" className="h-9 w-9" style={{ color: ACCENT }} fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </Panel>
        <div className="flex gap-2">
          <Chip>Veo</Chip>
          <Chip>Kling</Chip>
          <Chip>Runway</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

function TikTokCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Guía">
      <Scene>
        <Panel className="h-28 w-[72px] rounded-[18px]">
          <svg viewBox="0 0 24 24" className="h-7 w-7" style={{ color: ACCENT }} fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </Panel>
        <div className="flex gap-2">
          <Chip active>Vídeos con IA</Chip>
          <Chip>TikTok</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

function ImagesCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Comparativa">
      <Scene>
        <Panel className="h-24 w-36 overflow-hidden p-0">
          <svg viewBox="0 0 144 96" className="h-full w-full" aria-hidden>
            <circle cx="104" cy="28" r="10" fill={ACCENT} opacity="0.9" />
            <path d="M8 84 L52 44 L80 72 L100 56 L136 84 Z" fill="#ffffff" opacity="0.14" />
            <path d="M8 84 L52 44 L80 72 L100 56 L136 84" fill="none" stroke={ACCENT} strokeWidth="2" opacity="0.8" />
          </svg>
        </Panel>
        <div className="flex gap-2">
          <Chip>Midjourney</Chip>
          <Chip>DALL·E</Chip>
          <Chip>Leonardo</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

function DeepfakeCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Noticias">
      <Scene>
        <Panel className="relative h-24 w-24 overflow-hidden">
          <svg viewBox="0 0 24 24" className="h-11 w-11 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <circle cx="12" cy="9" r="3.5" />
            <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
          </svg>
          <span className="absolute inset-y-0 left-1/2 w-px bg-[#5b8bff]/70" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
        </Panel>
        <div className="flex gap-2">
          <Chip>REAL</Chip>
          <span className="text-[11px] font-semibold text-white/40">vs</span>
          <Chip active>IA</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

function AgentsCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Noticias">
      <Scene>
        <Panel className="h-24 w-40 p-0">
          <svg viewBox="0 0 160 96" className="h-full w-full" aria-hidden>
            <line x1="80" y1="48" x2="34" y2="26" stroke={ACCENT} strokeWidth="1.5" opacity="0.6" />
            <line x1="80" y1="48" x2="34" y2="70" stroke={ACCENT} strokeWidth="1.5" opacity="0.6" />
            <line x1="80" y1="48" x2="128" y2="30" stroke={ACCENT} strokeWidth="1.5" opacity="0.6" />
            <line x1="80" y1="48" x2="128" y2="66" stroke={ACCENT} strokeWidth="1.5" opacity="0.6" />
            <circle cx="34" cy="26" r="6" fill="#fff" opacity="0.85" />
            <circle cx="34" cy="70" r="6" fill="#fff" opacity="0.85" />
            <circle cx="128" cy="30" r="6" fill="#fff" opacity="0.85" />
            <circle cx="128" cy="66" r="6" fill="#fff" opacity="0.85" />
            <circle cx="80" cy="48" r="11" fill={ACCENT} />
          </svg>
        </Panel>
        <div className="flex gap-2">
          <Chip active>Agentes de IA</Chip>
          <Chip>Multi-agente</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

function PromptsCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Guía">
      <Scene>
        <Panel className="h-24 w-44 flex-col items-start gap-2 p-4">
          <div className="flex gap-1.5">
            <Dot color="#ff5f57" />
            <Dot color="#febc2e" />
            <Dot color="#28c840" />
          </div>
          <div className="font-mono text-[13px] text-white/85">
            <span style={{ color: ACCENT }}>{">"}</span> escribe un prompt
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-[#5b8bff]" />
          </div>
        </Panel>
        <div className="flex gap-2">
          <Chip>ChatGPT</Chip>
          <Chip active>30 prompts</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

function ChatGptCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Guía">
      <Scene>
        <Panel className="h-24 w-44 flex-col items-stretch gap-2 p-3.5">
          <span className="self-end rounded-2xl rounded-br-sm bg-[#2f6bff]/80 px-3 py-1 text-[11px] font-medium text-white">
            ¿Qué es la IA?
          </span>
          <span className="self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85">
            Te lo explico…
          </span>
        </Panel>
        <div className="flex gap-2">
          <Chip active>ChatGPT</Chip>
          <Chip>Principiantes</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

function WorkCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Herramientas">
      <Scene>
        <Panel className="h-24 w-40 flex-col items-start gap-2 p-4">
          {[true, true, false].map((done, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-3.5 w-3.5 items-center justify-center rounded border",
                  done ? "border-[#5b8bff] bg-[#2f6bff]/30" : "border-white/25",
                )}
              >
                {done && (
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" style={{ color: ACCENT }} fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </span>
              <span className="h-1.5 rounded-full bg-white/20" style={{ width: 74 - i * 14 }} />
            </div>
          ))}
        </Panel>
        <div className="flex gap-2">
          <Chip>Copilot</Chip>
          <Chip>Notion</Chip>
          <Chip>Gemini</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

function FreeToolsCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Herramientas">
      <Scene>
        <div className="grid grid-cols-3 gap-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-sm",
                i === 0
                  ? "border-[#5b8bff]/50 bg-[#2f6bff]/25"
                  : "border-white/10 bg-white/[0.06]",
              )}
            >
              <span
                className="h-3.5 w-3.5 rounded-md"
                style={{ background: i === 0 ? ACCENT : "rgba(255,255,255,.25)" }}
              />
            </span>
          ))}
        </div>
        <Chip active>Gratis</Chip>
      </Scene>
    </CoverBase>
  );
}

function MoneyCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Guía">
      <Scene>
        <Panel className="h-24 w-40 p-0">
          <svg viewBox="0 0 160 96" className="h-full w-full" aria-hidden>
            <path d="M16 78 L52 60 L84 66 L120 34 L146 20" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M120 34 L146 20 L146 30" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="34" cy="30" r="12" fill="none" stroke="#fff" strokeWidth="2" opacity="0.85" />
            <text x="34" y="35" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" opacity="0.9">€</text>
          </svg>
        </Panel>
        <div className="flex gap-2">
          <Chip active>Ganar dinero</Chip>
          <Chip>con IA</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

function StudyCover({ className }: { className?: string }) {
  return (
    <CoverBase className={className} kicker="Guía">
      <Scene>
        <Panel className="h-24 w-28">
          <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: ACCENT }} aria-hidden>
            <path d="M2 9 12 4l10 5-10 5L2 9Z" />
            <path d="M6 11v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
            <path d="M22 9v5" />
          </svg>
        </Panel>
        <div className="flex gap-2">
          <Chip>NotebookLM</Chip>
          <Chip>Perplexity</Chip>
        </div>
      </Scene>
    </CoverBase>
  );
}

/* ---------- Registro y punto de entrada ---------- */

const topicCovers: Record<string, (p: { className?: string }) => JSX.Element> = {
  "chatgpt-vs-gemini-vs-claude-2026": CompareCover,
  "mejores-generadores-video-ia-2026": VideoCover,
  "como-crear-videos-ia-tiktok-2026": TikTokCover,
  "mejores-generadores-imagenes-ia-2026": ImagesCover,
  "como-detectar-imagenes-videos-ia-2026": DeepfakeCover,
  "agentes-de-ia-guia-2026": AgentsCover,
  "mejores-prompts-chatgpt-2026": PromptsCover,
  "como-usar-chatgpt-principiantes-2026": ChatGptCover,
  "ia-para-el-trabajo-productividad-2026": WorkCover,
  "mejores-herramientas-ia-gratis-2026": FreeToolsCover,
  "como-ganar-dinero-con-ia-2026": MoneyCover,
  "como-estudiar-con-ia-2026": StudyCover,
};

interface TopicCoverProps {
  category: CategorySlug;
  slug: string;
  className?: string;
}

/** Portada del artículo: usa la escena temática si existe; si no, la genérica por categoría. */
export function TopicCover({ category, slug, className }: TopicCoverProps) {
  const Scene = topicCovers[slug];
  if (Scene) return <Scene className={className} />;
  return <ArticleCover category={category} seed={slug} className={className} />;
}
