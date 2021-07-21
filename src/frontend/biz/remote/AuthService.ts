import { GeneratedBizBase } from "../../../framework/frontend/GeneratedBizBase";

import { Response } from "../../../framework/biz/Response";
export class AuthService extends GeneratedBizBase {
  async login(mail: string, password: string): Promise<Response<string>> {
    return super.restCall<Response<string>>("post", "/v1/AuthService/login", arguments);
  }
  async createAccount(mail: string, password: string, name: string): Promise<Response<string>> {
    return super.restCall<Response<string>>("post", "/v1/AuthService/createAccount", arguments);
  }
}
