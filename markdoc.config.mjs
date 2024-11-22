import { defineMarkdocConfig, nodes, component } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  tags: {
    DrivePreview: {
      render: component("@components/article/DrivePreview.astro"),
      attributes: {
        driveId: { type: String },
        name: { type: String },
        type: { type: String },
      },
    },
    YoutubeVideo: {
      render: component("@components/article/YoutubeVideo.astro"),
      attributes: {
        videoId: { type: String },
        position: {
          type: String,
          matches: ["left", "center", "right"],
        },
        timestamp: {
          type: Object,
          properties: {
            hour: {
              type: Number,
            },
            minute: {
              type: Number,
            },
            second: {
              tyep: Number,
            },
          },
        },
      },
    },
  },
  nodes: {
    document: {
      ...nodes.document,
      render: null,
    },
    table: {
      ...nodes.table,
      render: component("@components/article/TableWrapper.astro"),
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
