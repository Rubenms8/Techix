/**
 * Descarga portadas reales desde la API oficial de Pexels y las asigna a cada artículo.
 * - Consultas priorizadas por marca/tema (de específico a genérico).
 * - Evita imágenes repetidas entre artículos.
 * - Recorta/optimiza a 1600×900 vía el CDN de Pexels.
 * - Escribe cover / coverCredit / coverCreditUrl en el frontmatter.
 *
 * Uso:  PEXELS_API_KEY=xxxx node scripts/fetch-covers.mjs
 */
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error("❌ Falta PEXELS_API_KEY (defínelo en el entorno o en .env.local).");
  process.exit(1);
}

const ROOT = process.cwd();
const ART_DIR = path.join(ROOT, "content", "articles");
const OUT_DIR = path.join(ROOT, "public", "covers");
fs.mkdirSync(OUT_DIR, { recursive: true });

/** Consultas por artículo: de la más específica (marca) a la más genérica pero relevante. */
const QUERIES = {
  "mejores-herramientas-ia-gratis-2026": ["chatgpt smartphone app", "ai apps phone screen", "artificial intelligence technology"],
  "mejores-generadores-video-ia-2026": ["cinema film camera", "video production camera", "movie filmmaking"],
  "como-ganar-dinero-con-ia-2026": ["euro money banknotes", "money finance cash", "financial charts screen"],
  "agentes-de-ia-guia-2026": ["humanoid robot", "robot artificial intelligence", "robotics technology"],
  "mejores-prompts-chatgpt-2026": ["chatgpt screen laptop", "chatgpt phone", "ai chatbot conversation"],
  "chatgpt-vs-gemini-vs-claude-2026": ["ai chatbot apps smartphone", "chatgpt app phone", "artificial intelligence brain"],
  "como-crear-videos-ia-tiktok-2026": ["tiktok smartphone", "content creator phone video", "vertical video smartphone"],
  "como-detectar-imagenes-videos-ia-2026": ["facial recognition technology", "digital face biometric", "face scan data"],
  "como-estudiar-con-ia-2026": ["study desk books notes", "student books library", "open book studying"],
  "mejores-generadores-imagenes-ia-2026": ["digital generative art", "colorful abstract digital art", "creative art technology"],
  "como-usar-chatgpt-principiantes-2026": ["chatgpt smartphone", "openai chatgpt screen", "ai assistant phone"],
  "ia-para-el-trabajo-productividad-2026": ["modern office workspace desk", "business technology laptop desk", "workspace computer office"],
  // --- Bloque 3 (13-18) ---
  "nuevos-modelos-ia-2026": ["artificial intelligence brain", "ai technology abstract", "artificial intelligence chip"],
  "automatizar-trabajo-ia-n8n-2026": ["circuit board technology", "network connection technology", "server data technology"],
  "deepseek-que-es-como-usar-2026": ["ai chatbot smartphone app", "smartphone artificial intelligence", "phone ai assistant"],
  "clonar-voz-ia-elevenlabs-2026": ["studio microphone", "podcast microphone", "recording microphone audio"],
  "mejores-ia-crear-musica-2026": ["music studio headphones", "synthesizer keyboard music", "music production studio"],
  "ia-para-programar-2026": ["programming code screen", "software source code", "developer code laptop"],
  // --- Bloque 4 (19-24) ---
  "como-usar-gemini-google-2026": ["google search smartphone", "smartphone google app", "phone ai assistant screen"],
  "grok-ia-elon-musk-2026": ["social media app smartphone", "smartphone social network", "phone app screen dark"],
  "perplexity-vs-google-2026": ["search engine laptop screen", "internet search computer", "laptop web browsing"],
  "ia-y-empleo-2026": ["business team meeting office", "office coworking people", "modern office teamwork"],
  "editar-videos-con-ia-capcut-2026": ["video editing timeline screen", "video editing software", "content creator editing video"],
  "notion-ai-organizar-trabajo-2026": ["planner notebook desk organized", "desk planning notebook", "organized workspace planner"],
  // --- Bloque 5 (25-30) ---
  "midjourney-guia-principiantes-2026": ["colorful digital abstract art", "generative art illustration", "creative digital painting"],
  "ia-para-presentaciones-gamma-2026": ["business presentation slides screen", "presentation laptop meeting", "slideshow screen projector"],
  "como-detectar-textos-ia-2026": ["typing on laptop keyboard", "writing text on computer", "keyboard typing document"],
  "que-es-ia-generativa-2026": ["abstract technology data visualization", "neural network abstract", "digital technology abstract blue"],
  "mejores-apps-ia-movil-2026": ["hand holding smartphone apps", "mobile phone applications screen", "smartphone home screen apps"],
  "futuro-de-la-ia-2026": ["futuristic technology concept", "abstract future digital technology", "science technology futuristic"],
  // --- Bloque 6 (31-36) ---
  "como-usar-claude-anthropic-2026": ["ai chatbot on laptop screen", "laptop artificial intelligence writing", "person using laptop ai"],
  "microsoft-copilot-que-es-como-usar-2026": ["laptop office work documents", "working on laptop office", "computer office software desk"],
  "mejores-ia-para-traducir-2026": ["language dictionary books", "world languages communication", "learning languages study"],
  "regulacion-ia-2026": ["law justice books gavel", "government institutional building", "legal documents law office"],
  "hacer-cv-con-ia-2026": ["resume cv document on desk", "job application paper desk", "curriculum vitae document"],
  "estafas-con-ia-como-protegerte-2026": ["cyber security padlock", "digital security lock laptop", "online data protection security"],
  // --- Bloque 7 (37-40) ---
  "notebooklm-guia-2026": ["study notes and laptop desk", "research documents on desk", "organized study notebook laptop"],
  "crear-logo-con-ia-2026": ["graphic design workspace desk", "logo design sketch creative", "designer working brand desk"],
  "aprender-idiomas-con-ia-2026": ["learning language on phone", "language study books desk", "online learning student laptop"],
  "ia-codigo-abierto-2026": ["open source code on monitor", "software development code screen", "programming code dark screen"],
  // --- Bloque 8 (41-45) ---
  "crear-web-con-ia-sin-codigo-2026": ["website design on laptop", "web design mockup screen", "building a website on computer"],
  "avatares-ia-video-heygen-2026": ["person presenting to camera", "recording video presenter studio", "vlogger recording camera"],
  "ia-para-redes-sociales-2026": ["social media content planning phone", "instagram social media phone", "content creator planning desk"],
  "editar-fotos-con-ia-2026": ["photo editing on computer screen", "photographer editing photos laptop", "photo editing software"],
  "que-es-machine-learning-2026": ["data visualization on screen", "abstract data technology blue", "big data analytics screen"],
  // --- Bloque 9 (46-50) ---
  "chatbot-ia-para-negocio-2026": ["customer service headset support", "online chat support business", "call center customer service"],
  "ia-para-seo-2026": ["website analytics dashboard screen", "marketing analytics graph laptop", "seo data charts screen"],
  "apple-intelligence-siri-2026": ["iphone in hand apps", "person using iphone", "apple smartphone screen"],
  "hacer-podcast-con-ia-2026": ["podcast microphone and laptop", "recording podcast setup", "podcast studio desk microphone"],
  "merece-la-pena-chatgpt-plus-2026": ["chatgpt on laptop screen open", "laptop ai chatbot interface", "using ai on laptop"],
  // --- Bloque 10 (51-55) ---
  "ia-para-viajar-planificar-2026": ["travel map and suitcase planning", "world map passport travel", "planning a trip with map"],
  "mejores-ia-para-resumir-2026": ["stack of documents and notes", "reading documents at desk", "books and papers study desk"],
  "navegadores-con-ia-2026": ["web browser on laptop", "internet browsing on computer", "laptop screen web page"],
  "ia-para-invertir-finanzas-2026": ["finance investment app phone", "stock market chart screen", "personal finance money app"],
  "ia-para-excel-hojas-calculo-2026": ["spreadsheet data on laptop screen", "data charts analysis laptop", "business data spreadsheet"],
  // --- Bloque 11 (56-60) ---
  "meta-ai-llama-whatsapp-2026": ["whatsapp on smartphone screen", "messaging app on phone", "social media chat app phone"],
  "escribir-libro-con-ia-2026": ["writing book in notebook", "author writing at desk laptop", "open book and coffee writing"],
  "ia-para-cocinar-recetas-2026": ["fresh cooking ingredients kitchen counter", "healthy food ingredients cooking", "kitchen cooking vegetables"],
  "como-aprender-ia-desde-cero-2026": ["online learning with laptop", "student studying laptop notebook", "e-learning education desk"],
  "ia-en-la-educacion-2026": ["students in classroom learning", "school classroom students", "university students studying"],
};

const used = new Set();

async function search(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=20`;
  const r = await fetch(url, { headers: { Authorization: KEY } });
  if (!r.ok) {
    console.warn(`   ⚠ Pexels ${r.status} para "${query}"`);
    return [];
  }
  const j = await r.json();
  return j.photos || [];
}

async function pick(slug) {
  for (const q of QUERIES[slug]) {
    const photos = await search(q);
    for (const p of photos) {
      if (used.has(p.id)) continue;
      if ((p.width || 0) < 1200) continue;
      used.add(p.id);
      return { photo: p, query: q };
    }
  }
  return null;
}

async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`descarga ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

function upsertFrontmatter(file, fields) {
  let raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) throw new Error("frontmatter no encontrado");
  let fm = m[1];
  for (const [k, v] of Object.entries(fields)) {
    const line = `${k}: ${JSON.stringify(v)}`;
    const re = new RegExp(`^${k}:.*$`, "m");
    fm = re.test(fm) ? fm.replace(re, line) : `${fm}\n${line}`;
  }
  fs.writeFileSync(file, raw.replace(m[0], `---\n${fm}\n---`));
}

// Pre-pass: respeta las portadas ya asignadas y siembra sus IDs para no repetir.
const skip = new Set();
for (const slug of Object.keys(QUERIES)) {
  const file = path.join(ART_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) continue;
  const raw = fs.readFileSync(file, "utf8");
  if (/\ncover:\s*"/.test(raw)) {
    skip.add(slug);
    const m = raw.match(/coverCreditUrl:\s*"[^"]*?(\d+)\/?"/);
    if (m) used.add(Number(m[1]));
  }
}

const report = [];

for (const slug of Object.keys(QUERIES)) {
  const file = path.join(ART_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) {
    console.warn(`⏭  Sin archivo: ${slug}.md`);
    continue;
  }
  if (skip.has(slug)) {
    console.log(`↩  ${slug} (ya tiene portada, se mantiene)`);
    continue;
  }
  const found = await pick(slug);
  if (!found) {
    console.warn(`❌ Sin imagen para ${slug}`);
    continue;
  }
  const p = found.photo;
  const dlUrl = `${p.src.original}?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=900`;
  const dest = path.join(OUT_DIR, `${slug}.jpg`);
  const bytes = await download(dlUrl, dest);
  upsertFrontmatter(file, {
    cover: `/covers/${slug}.jpg`,
    coverCredit: p.photographer,
    coverCreditUrl: p.url,
  });
  const kb = Math.round(bytes / 1024);
  console.log(`✅ ${slug}\n   query: "${found.query}" · foto: ${p.photographer} · ${kb}KB\n   alt: ${p.alt || "(sin alt)"}`);
  report.push({ slug, query: found.query, photographer: p.photographer, url: p.url, alt: p.alt, kb });
}

fs.writeFileSync(path.join(ROOT, "scripts", "covers-report.json"), JSON.stringify(report, null, 2));
console.log(`\n🎉 Portadas asignadas: ${report.length}/${Object.keys(QUERIES).length}`);
