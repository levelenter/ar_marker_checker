import { PoolConnection } from "mysql2/promise";
import { Transactional } from "../../framework/biz/@Transactional";
import { Rest } from "../../framework/biz/@Rest";
import { Response } from "../../framework/biz/Response";

export class TestBService {
  connection!: PoolConnection;

  /**
   * ビジネスロジックメソッドのテンプレート
   */
  @Rest("/v1/TestService/method", "post")
  @Transactional("connection")
  async method(): Promise<Response<any>> {
    const result: any = { a: "test" };
    console.log("connection", this.connection.threadId);
    return new Response<any>(result);
  }
}
