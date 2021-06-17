import { PoolConnection } from "mysql2/promise";
import { Transactional } from "../../framework/biz/@Transactional";
import { Rest } from "../../framework/biz/@Rest";
import { Response } from "../../framework/biz/Response";
import { SampleTableDao } from "../dao/SampleTableDao";
import { SampleTable } from "../dto/generated/SampleTable";
export class TestService {
  connection!: PoolConnection;

  /**
   * ビジネスロジックメソッドのテンプレート
   */
  @Rest("/v1/TestService/getByNote", "get", false)
  @Transactional("connection")
  async getByNote(sentence: string): Promise<Response<SampleTable[]>> {
    console.log("connection", this.connection.threadId);
    const dao = new SampleTableDao(this.connection);
    const data = await dao.selectByNote(sentence);
    return new Response(data);
  }
}
