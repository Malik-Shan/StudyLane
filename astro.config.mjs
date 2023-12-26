import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  markdown: {
        remarkPlugins: [
            'remark-math',
        ],
        rehypePlugins: [
            ['rehype-katex', {
            // Katex plugin options
            }]
        ]
    },
  integrations: [tailwind({
    applyBaseStyles: false
  }),],
  output: "hybrid",
  adapter: vercel()
});
