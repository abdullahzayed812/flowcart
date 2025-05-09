import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ResponseHandler } from "../utils/response-handler";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

// Middleware to check the JWT token and validate user roles
export function authMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ResponseHandler.unauthorized(res, "Unauthorized: Missing token");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { role: string };

      if (!roles.includes(decoded.role)) {
        return ResponseHandler.forbidden(res, "Forbidden: Insufficient role");
      }

      res.locals = decoded;
      next();
    } catch (error) {
      return ResponseHandler.unauthorized(res, "Forbidden: Invalid token");
    }
  };
}
