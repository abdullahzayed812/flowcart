import { RequestHandler } from "express";
import { ExpressHandler } from "../types";

export function wrapHandler<ReqBody = any, ReqParams = any, ReqQuery = any, ResBody = any>(
  handler: ExpressHandler<ReqBody, ReqParams, ReqQuery, ResBody>
): RequestHandler<ReqParams, ResBody, ReqBody, ReqQuery> {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
