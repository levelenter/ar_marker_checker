import { Response } from "../../src/framework/biz/Response";
import { TestService } from "../../src/server/biz/TestService";

describe("Transaction Test", () => {
  it("test service", async (done) => {
    const biz = new TestService();

    const plist: Promise<Response<any>>[] = [];
    for (let i = 0; i < 10; i++) {
      plist.push(biz.method());
    }

    console.log("test");
    await Promise.all(plist);

    done();
  });
});
