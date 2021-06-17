import config from "config";
import packageJson from "../../package.json";
import { app } from "./app";
import { logger } from "../framework/util/logger";
import { firstConnection } from "../framework/biz/ConnectionFactory";
import { dayjs, DTW_FORMAT_JA } from "../framework/util/momentExtends";

console.log(process.env.env === "本番環境", process.env.env === "テスト環境");
if (process.env.env === "本番環境") {
  console.log = function() {
    // no
  };
}

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
  const logString = `サーバー起動成功version.${
    packageJson.version
  } ${dayjs().format(DTW_FORMAT_JA)}PORT: ${bind}をリッスンしています。`;

  // ログとコンソールに書く
  logger.info(logString);

  // DB接続確認
  firstConnection().then();
});
