import jwt from "jsonwebtoken";
import config from "config";
import express from "express";
import { ignoreTokenUriList } from "../../framework/web/ignoreTokenUriList";
import { messageResource } from "../../framework/util/MessageResource";

/**
 * Express Routerはサブアプリケーションを作成する
 * /wepapi 配下をアプリケーションとしRESTっぽいAPIを提供する
 * ここではtokenを検証するフィルタを実装
 */
export const authRest = express.Router();

/**
 * 認証フィルター
 * tokenを検証する
 * 403や{"message":"No JWT token provided."}が表示される時、パスが間違っていることも確認してください。
 * /v1/user/list が v1/user/list になっているような時も、このメソッドが反応したりします。
 */
authRest.use((req, res, next) => {
  // /v?で始まっているパスのみJWTトークンをチェックする
  if (!req.path.toLocaleLowerCase().match(/^\/v[0-9]/)) {
    next();
    return;
  }

  // indexはトークン除外
  ignoreTokenUriList.push({
    uri: "/",
    httpMethod: "get",
  });

  // トークン無視していいリストに入っていたら無視
  const ignoreUri = ignoreTokenUriList.some((item) => {
    return (
      item.uri.toLowerCase() === req.path.toLowerCase() &&
      req.method.toLowerCase() === item.httpMethod.toLowerCase()
    );
  });

  if (ignoreUri) {
    next();
    return;
  }

  // ポスト本体、URLパラメータ、HTTPヘッダいずれかにトークンがセットされているか調べる
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    // トークンが設定されていなかった場合は無条件に 403 エラー
    return res.status(403).send({ message: messageResource.NO_JWT_TOKEN });
  }

  // 設定されていたトークンの値の正当性を確認
  try {
    jwt.verify(token, config.get("secret"), (err: any, decoded: any) => {
      if (err) {
        console.error(`jwt verify error`, jwt.decode(token));
        // 正当な値ではなかった場合はエラーメッセージを返す
        return res
          .status(200)
          .json({ message: messageResource.INVALID_TOKEN, status: 403 });
      } else {
        // 正当な値が設定されていた場合は処理を続ける
        (req as any).decoded = decoded;
        next();
      }
    });
  } catch (e) {
    console.log("token verify error ", e);
  }
});
