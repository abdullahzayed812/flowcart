import { Request, Response, NextFunction } from "express";

// Error handler middleware
export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof Error ? 500 : 400; // Default to 500 for server errors, 400 for client-side
  const message = err.message || "Internal Server Error";

  // Log the error to the console (you might want to log to a logging service in production)
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
  });
};
