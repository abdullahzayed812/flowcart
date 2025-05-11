import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/jwt-util";

export class AuthMiddleware {
  constructor(private readonly jwtUtil: JwtUtil) {}

  validateToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Authentication required" });
        return;
      }

      const decoded = this.jwtUtil.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };

  // Middleware factory to check specific roles
  hasRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ message: "Authentication required" });
        return;
      }

      const { roles, baseRole } = req.user;
      const userRoles = [...roles, baseRole];

      const hasAllowedRole = allowedRoles.some((role) => userRoles.includes(role));

      if (!hasAllowedRole) {
        res.status(403).json({ message: "Insufficient permissions" });
        return;
      }

      next();
    };
  };
}

export const createAuthMiddleware = (jwtSecret?: string): AuthMiddleware => {
  const jwtUtil = new JwtUtil(jwtSecret);
  return new AuthMiddleware(jwtUtil);
};
