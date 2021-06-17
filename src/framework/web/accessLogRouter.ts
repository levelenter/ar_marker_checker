import express from "express";
import { logger } from "../util/logger";

export const accessLogRouter = express.Router();

accessLogRouter.use(function(
  req: express.Request,
  res: express.Response,
  next
) {
  req.range(100000, { combine: true });
  // アクセスログ
  logger.info("access :", req.path, req.headers["user-agent"]);
  next();
});
