import { Response, Request } from "express";

export type WithError<T> = T & { error?: string };

export type ExpressHandler<ReqBody = any, ResBody = any> = (
  req: Request<any, Partial<WithError<ResBody>>, Partial<ReqBody>, any>,
  res: Response<Partial<WithError<ResBody>>>
) => void | Promise<void> | Response | Promise<Response>;
