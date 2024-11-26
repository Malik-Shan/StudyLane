import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react(), markdoc({
    allowHTML: true,
  }), keystatic(), svelte()],
  output: "hybrid",
  adapter: vercel(),
});