import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import db from "@astrojs/db";

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
  }), db()],
  output: "hybrid",
  adapter: vercel()
});