import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import rehypeAddClasses from "rehype-add-classes";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact(), tailwindcss(), 
    mdx({
      remarkPlugins: [collectHeadings],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAddClasses,
          {
            h1: "group",
            h2: "group",
            h3: "group",
            h4: "group",
            h5: "group",
            h6: "group",
          },
        ],
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              className:
                "ml-2 opacity-0 transition-all duration-400 group-hover:opacity-100",
            },
            content: {
              type: "element",
              tagName: "span",
              children: [{ type: "text", value: "#" }],
            },
          },
        ],
      ],
    }),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),],
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    port: 4777,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});


function collectHeadings() {
  return (tree) => {
    const headings = [];

    visit(tree, "heading", (node) => {
      const depth = node.depth;
      const text = node.children
        .filter((child) => child.type === "text" || child.type === "inlineCode")
        .map((child) => child.value)
        .join("");

      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");

      headings.push({ depth, text, id });
    });

    // Inject the headings as an export in the MDX content
    tree.children.unshift({
      type: "mdxjsEsm",
      value: `export const headings = ${JSON.stringify(headings)};`,
      data: {
        estree: {
          type: "Program",
          body: [
            {
              type: "ExportNamedDeclaration",
              declaration: {
                type: "VariableDeclaration",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "headings" },
                    init: {
                      type: "Literal",
                      value: headings,
                      raw: JSON.stringify(headings),
                    },
                  },
                ],
                kind: "const",
              },
              specifiers: [],
              source: null,
            },
          ],
          sourceType: "module",
        },
      },
    });
  };
}
