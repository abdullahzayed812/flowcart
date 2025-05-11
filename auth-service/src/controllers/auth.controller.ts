import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ResponseHandler } from "@shared/utils/response-handler";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, role } = req.body;

      if (!email || !password || !role) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const newUser = await this.authService.registerUser(email, password, role);
      res.status(201).json({
        message: "User registered successfully",
        userId: newUser.id,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async validateToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
      }

      const decoded = this.authService.verifyToken(token);
      res.status(200).json({ valid: true, user: decoded });
    } catch (error: any) {
      res.status(401).json({ valid: false, message: error.message });
    }
  }
}
