import config from "config";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { Transactional } from "../../framework/biz/@Transactional";
import { Rest } from "../../framework/biz/@Rest";
import { Response } from "../../framework/biz/Response";
import { UsersDao } from "../dao/UsersDao";
import { ulid } from "ulid";

import crypto from "crypto";
import jwt from "jsonwebtoken";
import { RecoverableError } from "../../framework/biz/RecoverableError";

export class AuthService {
  connection!: PoolConnection;

  getNewUserId(): string {
    return ulid();
  }

  hashPassword(password: string): string {
    const sha512 = crypto.createHash("sha512");
    sha512.update(password);
    const hash = sha512.digest("base64");
    return hash;
  }

  createJwtToken(name: string, userId: string): string {
    // 認証トークンを作成以後、APIアクセスにはトークンが必要
    const token = jwt.sign({ name: name, userId: userId }, config.get<string>("secret"), { expiresIn: "24h" }); // 第1引数のpayloadに、MySQLのresultsはNG
    return token;
  }

  /**
   * ログイン処理 URL: /webapi/user/login_api
   * 認証フィルターを通る前なのでtoken渡しは不要
   * JWTトークンを返す、以降のAPIコールはtokenを検証する
   */
  @Rest("/v1/AuthService/login", "post", false)
  @Transactional("connection")
  async login(mail: string, password: string): Promise<Response<string>> {
    const hash = this.hashPassword(password);
    console.log(mail, hash);

    // パスワードとアドレスでユーザを取得
    const dao = new UsersDao(this.connection);
    const users = await dao.getUserByMailAndPass(mail, hash);

    // ログインできなかった
    if (users.length < 1) throw new RecoverableError("メールアドレスまたはパスワードが間違っています");
    const user = users[0];

    // ログインカウントアップ
    await dao.updateLoginCount(user);

    console.log("ログインできた");
    const name = users[0].display_name;
    const userId = users[0].user_id;

    const token = this.createJwtToken(name, userId);
    // レスポンスにトークンを保存
    return new Response(token);
  }

  /**
   * アカウント作成のAPI
   * @param mail メールアドレス
   * @param password パスワード
   * @param name ユーザー名（なければメールアドレスの冒頭）
   * @param authTags ユーザーの権限タグ（任意）
   * @param belongTo 所属（任意）
   * @returns トークン
   */
  @Rest("/v1/AuthService/createAccount", "post", false)
  @Transactional("connection")
  async createAccount(mail: string, password: string, name: string): Promise<Response<string>> {
    if (!mail) throw new RecoverableError("メールアドレスを入力してください");

    const dao = new UsersDao(this.connection);
    const users = await dao.getUserByMail(mail);

    if (users.length > 0) throw new RecoverableError("すでに存在するメールアドレスです。");
    // パスワードをハッシュ化
    const hash = this.hashPassword(password);
    console.log(mail, hash);

    // 新規のユーザーIDを作成
    const userId = this.getNewUserId();

    // ユーザを登録
    const insertResult = await dao.insertUser(userId, name, mail, hash);

    // トークン作成
    const token = this.createJwtToken(name, userId);

    return new Response(token);
  }
}
