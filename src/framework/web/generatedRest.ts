import express from "express";
import { errorHandler } from "./web_handler";
import { TestService } from "../../server/biz/TestService";

export const generatedRest = express.Router();

generatedRest.get(
  "/v1/TestService/getByNote",
  async (req: express.Request, res: express.Response) => {
    const biz = new TestService();
    biz
      .getByNote(req.query[0] as string)
      .then((result) => res.send(result))
      .catch((error) => errorHandler(res, error));
  }
);
