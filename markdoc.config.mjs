import { defineMarkdocConfig, nodes, component } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  nodes: {
    document: {
      ...nodes.document,
      render: null,
    },
  },
  extends: [
    shiki({
      theme: "material-theme-palenight",
      wrap: true,
      langs: [],
    }),
  ],
});
