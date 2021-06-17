import { PoolConnection } from "mysql2/promise";
import { Transactional } from "../../framework/biz/@Transactional";
import { Rest } from "../../framework/biz/@Rest";
import { Response } from "../../framework/biz/Response";
import { TestBService } from "./TestBService";

export class TestService {
  connection!: PoolConnection;

  /**
   * ビジネスロジックメソッドのテンプレート
   */
  @Rest("/v1/TestService/method", "get", false)
  @Transactional("connection")
  async method(): Promise<Response<any>> {
    const result: any = { a: "test" };
    console.log("connection", this.connection.threadId);

    const testb = new TestBService();
    await testb.method();

    return new Response<any>(result);
  }
}
