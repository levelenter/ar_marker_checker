import { SampleTable } from "../../../server/dto/generated/SampleTable";

import { GeneratedBizBase } from "../../../framework/frontend/GeneratedBizBase";

import { Response } from "../../../framework/biz/Response";
export class TestService extends GeneratedBizBase {
  async getByNote(sentence: string): Promise<Response<SampleTable[]>> {
    return super.restCall<Response<SampleTable[]>>("get", "/v1/TestService/getByNote", arguments);
  }
}
