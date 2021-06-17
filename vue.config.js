/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "/src/frontend"),
      },
    },
  },
  outputDir: "dist/public",
  pages: {
    index: {
      entry: "src/frontend/main.ts",
      template: "src/public/index.html",
    },
  },
};
