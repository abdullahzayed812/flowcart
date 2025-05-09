import { Response } from "express";

export class ResponseHandler {
  static success<T>(res: Response, data: T, message = "Success", status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, message: string, status = 500, error?: any) {
    return res.status(status).json({
      success: false,
      message,
      error,
    });
  }

  static unauthorized(res: Response, message = "Unauthorized") {
    return res.status(401).json({
      success: false,
      message,
    });
  }

  static forbidden(res: Response, message = "Forbidden") {
    return res.status(403).json({
      success: false,
      message,
    });
  }

  static notFound(res: Response, message = "Not Found") {
    return res.status(404).json({
      success: false,
      message,
    });
  }

  static badRequest(res: Response, message = "Bad Request") {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  static conflict(res: Response, message = "Conflict") {
    return res.status(409).json({
      success: false,
      message,
    });
  }

  static unprocessable(res: Response, message = "Unprocessable Entity") {
    return res.status(422).json({
      success: false,
      message,
    });
  }

  static internal(res: Response, message = "Internal Server Error") {
    return res.status(500).json({
      success: false,
      message,
    });
  }
}
