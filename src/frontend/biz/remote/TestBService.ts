import { GeneratedBizBase } from '../../../framework/frontend/GeneratedBizBase';


import { Response } from '../../../framework/biz/Response';export class TestBService extends GeneratedBizBase{
  async method(): Promise<Response<any>> {
    return super.restCall<Response<any>>("post", "/v1/TestService/method", arguments);
  }
}
