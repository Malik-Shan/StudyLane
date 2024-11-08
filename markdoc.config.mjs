import { defineMarkdocConfig, nodes, component } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  tags: {
    DrivePreview: {
      render: component("@components/article/DrivePreview.astro"),
      attributes: {
        driveId: { driveId: String },
        name: { name: String },
        type: { type: String },
      },
    },
  },
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
