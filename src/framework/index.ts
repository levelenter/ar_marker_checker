"use strict";
import config from "config";
import packageJson from "../../package.json";
import { app } from "../server/app";
import { logger } from "./util/logger";
import { firstConnection } from "./biz/ConnectionFactory";
import { generatedRest } from "./web/generatedRest";
import { dayjs, DTW_FORMAT_JA, DT_FORMAT } from "./util/momentExtends";
import { messageResource } from "./util/MessageResource";
import express from "express";
import { accessLogRouter } from "./web/accessLogRouter";
import compression from "compression";

console.log(process.env.env === "本番環境", process.env.env === "テスト環境");
if (process.env.env === "本番環境") {
  console.log = function() {
    // no
  };
}
// JWS用のシークレット
app.set("superSecret", config.get("secret"));

// 圧縮
app.use(compression({ level: 6 }));

// アクセスログを記録
app.use(accessLogRouter);

/**
 * 自動生成したサブルーティングをセット
 */
app.use(generatedRest);

/**
 * エラーレスポンス（優先順位を最後にするため、他のルーティングより後にすること）
 */
app.use((err: any, req: express.Request, res: express.Response) => {
  console.error(dayjs().format(DT_FORMAT), err.stack);
  logger.error(err.stack);
  logger.error(req.headers);
  res.status(500).send(messageResource.SOMETHING_BROKEN + err.stack);
});

/**
 * サーバーの起動
 */
const server = app.listen(config.get("server_port"), () => {
  // 設定ファイル読み込み確認
  logger.info("NODE_ENV=%s", `"${process.env.NODE_ENV}"`);

  // 起動
  const addr = server.address();
  console.info("log in", addr, config);
  if (!addr) {
    throw new Error(`${addr}が取れませんでした`);
  }
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  const logString = `サーバー起動成功version.${packageJson.version} ${dayjs().format(DTW_FORMAT_JA)}PORT: ${bind}をリッスンしています。`;

  // ログとコンソールに書く
  logger.info(logString);

  // DB接続確認
  // firstConnection().then();
});
