/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        "@": path.join(__dirname, "/src/frontend"), // 1. @の参照先の変更
      },
    },
  },
  outputDir: "./build/build_client", // 2. 出力先
  pages: {
    index: {
      entry: "src/frontend/main.ts", // エントリーポイント
      template: "src/frontend/assets/index.html", //3. index.htmlテンプレート
    },
  },
};
