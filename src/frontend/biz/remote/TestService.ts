import { GeneratedBizBase } from '../../../framework/frontend/GeneratedBizBase';


import { Response } from '../../../framework/biz/Response';export class TestService extends GeneratedBizBase{
  async method(): Promise<Response<any>> {
    return super.restCall<Response<any>>("get", "/v1/TestService/method", arguments);
  }
}
