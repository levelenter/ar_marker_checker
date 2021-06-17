"use strict";
import express from "express";
import * as path from "path";
import history from "connect-history-api-fallback";

// routers
import { authRest } from "./web/authRest";

// Expressアプリケーションの開始
export const app = express();

/**
 * Body部をJSONとして扱う設定
 */
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Vuejs用index.html以外のアクセスをindex.htmlへフォールバック/APIへのアクセスは通したいのでtext/htmlのみを対象とする
const vueFallback = history({
  disableDotRule: true,
  htmlAcceptHeaders: ["text/html"],
});
app.use(vueFallback);

// ルートディレクトリは、Vueのビルド先を指定
app.use("/", express.static(path.resolve("./build/build_client/"))); // トップページ

// 認証のルーティング
app.use(authRest);
