import Axios, { AxiosStatic, AxiosInstance } from "axios";
import { ErrorHandler } from "./ErrorHandler";
import { Response } from "../biz/Response";
import { Session } from "./Session";
import { ErrorType } from "./ErrorType";

export class GeneratedBizBase {
  private _token!: string;

  // ユニットテスト時にSessionからトークンが取れないためインジェクトしてからやる
  get token(): string {
    if (!this._token || typeof this._token === "undefined") {
      // ユニットテスト環境では、Sessionをとれない
      this._token = Session.getJwtToken();
    }
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
  private _axios!: AxiosInstance;

  // ユニットテスト時にSessionからトークンが取れないためインジェクトしてからやる
  get axios(): AxiosInstance {
    if (!this._axios) {
      this._axios = Axios;
    }
    return this._axios;
  }

  set axios(value: AxiosInstance) {
    this._axios = value;
  }

  protected async restCall<T extends Response<any>>(
    method: "get" | "post" | "put" | "delete",
    path: string,
    sendData: any
  ): Promise<T> {
    let response;

    // トークンが取れないならログアウトしてリロード（ログインしなおして同じ画面へ移動してくる）

    // 送るデータにトークンをセットs
    sendData.token = this.token;
    let param = sendData;
    try {
      switch (method) {
        case "get":
          param = { params: sendData };
          response = await this.axios.get<T>(path, param);
          break;
        case "post":
          response = await this.axios.post<T>(path, param);
          break;
        case "put":
          response = await this.axios.put<T>(path, param);
          break;
        case "delete":
          response = await this.axios.delete<T>(path, param);
          break;
      }
    } catch (e) {
      const error = `${e}`;
      console.log(error.includes("403"));

      if (error.includes("403") === true) {
        Session.timeout();
      }
      throw new Error(error);
    }

    // StatusがOKなら、予期したエラー（入力チェック違反や準正常エラーなど）
    if (response.data.hasError && response.data.status !== ErrorType.OK) {
      ErrorHandler.atResponseError(response.data);
      return response.data;
    }
    return response.data;
  }
}
