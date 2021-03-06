"use strict";
import express from "express";
import * as path from "path";
import history from "connect-history-api-fallback";

// routers
import { authRest } from "./web/authRest";
import { fileRest } from "./web/fileRest";

// Expressアプリケーションの開始
export const app = express();

/**
 * Body部をJSONとして扱う設定
 */
app.use(express.json({ limit: "50mb" }) as any);
app.use(express.urlencoded({ limit: "50mb", extended: true }) as any);

app.use("/uploaded", express.static(path.resolve("uploaded")));
app.use("/public", express.static(path.resolve("public")));

// フォールバック前にファイルアップロードを処理
app.use("/v1", fileRest);

// Vuejs用index.html以外のアクセスをindex.htmlへフォールバック/APIへのアクセスは通したいのでtext/htmlのみを対象とする
const vueFallback = history({
  disableDotRule: true,
  htmlAcceptHeaders: ["text/html"]
});
app.use(vueFallback);

// ルートディレクトリは、Vueのビルド先を指定
app.use("/", express.static(path.resolve("./build/build_client/"))); // トップページ

// 認証のルーティング
app.use(authRest);
