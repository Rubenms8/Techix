import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

/**
 * Envuelve cada <table> en un <div class="table-scroll"> para que las tablas
 * anchas puedan desplazarse horizontalmente en móvil sin romper el layout.
 * Sin dependencias externas: recorre el árbol manualmente.
 */
function rehypeWrapTables() {
  type Node = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: Node[] };
  const walk = (node: Node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      walk(child);
      if (child.type === "element" && child.tagName === "table") {
        return {
          type: "element",
          tagName: "div",
          properties: { className: ["table-scroll"] },
          children: [child],
        } as Node;
      }
      return child;
    });
  };
  return (tree: Node) => {
    walk(tree);
  };
}

/**
 * Convierte Markdown (con GFM) a HTML.
 * - Añade `id` a los encabezados (rehype-slug) para anclas y tabla de contenidos.
 * - Añade enlaces automáticos a los encabezados.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["heading-anchor"] },
    })
    .use(rehypeWrapTables)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
