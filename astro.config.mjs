import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro"

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: ['remark-math'],
    rehypePlugins: [['rehype-katex', {
      // Katex plugin options
    }]]
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), db(), react(), markdoc(),keystatic()],
  output: "hybrid",
  adapter: vercel()
});
