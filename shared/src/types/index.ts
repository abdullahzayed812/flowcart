import { Response, Request, NextFunction } from "express";

export type ExpressHandler<ReqBody = any, ReqParams = any, ReqQuery = any, ResBody = any> = (
  req: Request<ReqParams, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<Response> | Response;
