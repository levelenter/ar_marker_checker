"use strict";
import express from "express";
import * as path from "path";
import compression from "compression";
import config from "config";
import jwt from "jsonwebtoken";
import { logger } from "../framework/util/logger";

// routers
import { authRest } from "./web/authRest";
import { generatedRest } from "../framework/web/generatedRest";
import { dayjs, DT_FORMAT } from "../framework/util/momentExtends";
import messageResource from "../../config/message.resource";

// Expressアプリケーションの開始
export const app = express();

function getTokestring(req: express.Request) {
  let token = "";
  if (req.body && req.body.token) {
    token = req.body.token;
  }
  if (req.query && (req.query as any).token) {
    token = (req.query as any).token;
  }
  if (req.headers && req.headers["x-access-token"]) {
    token = req.headers["x-access-token"] as string;
  }
  if (token) {
    // 設定されていたトークンの値の正当性を確認
    try {
      const decodedTokent = jwt.decode(token, config.get("secret"));
      return `user_id:${decodedTokent!.user_id}`;
    } catch (e) {
      return `token decode error ${JSON.stringify(e)}`;
    }
  }
  return "";
}

app.use(function(req: express.Request, res: express.Response, next) {
  req.range(100000, { combine: true });

  // アクセスログ
  if (
    !req.path.startsWith("/_nuxt/") &&
    !req.path.startsWith("/img") &&
    !req.path.startsWith("/css") &&
    !req.path.startsWith("/font") &&
    !req.path.startsWith("/assets") &&
    !req.path.startsWith("/manifest.json") &&
    !req.path.startsWith("/js")
  ) {
    const jwtTokenString = getTokestring(req);
    logger.info("access :", req.path, jwtTokenString);
  }
  next();
});

app.use(compression({ level: 6 }));

// ejsを使用するための設定
const ejsView = path.resolve(__dirname, "../src_view");
app.set("views", ejsView);
app.set("view engine", "ejs");

// JWS用のシークレット
app.set("superSecret", config.get("secret"));

/**
 * 静的ファイルディレクトリ
 */
app.use("/css", express.static(path.resolve("css")));
app.use("/img", express.static(path.resolve("public/img")));
app.use("/assets", express.static(path.resolve("public/assets")));
// app.use('/', express.static(path.resolve('public/root')));

// ルートディレクトリは、Vueのビルド先を指定
app.use("/", express.static(path.resolve("./build/build_client/"))); // トップページ
app.use("/app/", express.static(path.resolve("./build/build_client/app/"))); // アプリケーションページ

/**
 * Body部をJSONとして扱う設定
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// /v1 以下にルーティング
app.use("/", authRest);

// 自動生成したサブルーティング
app.use("/", generatedRest);

/**
 * エラーレスポンス（優先順位を最後にするため、他のルーティングより後にすること）
 */
app.use((req: express.Request, res: express.Response) => {
  console.error(messageResource.PAGE_NOT_FOUND + " : " + req.path);
  res.status(404).end(messageResource.PAGE_NOT_FOUND + " : " + req.path);
});

app.use((err: any, req: express.Request, res: express.Response) => {
  console.error(dayjs().format(DT_FORMAT), err.stack);
  logger.error(err.stack);
  logger.error(req.headers);
  res.status(500).send(messageResource.SOMETHING_BROKEN + err.stack);
});
