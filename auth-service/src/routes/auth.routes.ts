import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const createAuthRouter = (authController: AuthController): Router => {
  const router = Router();

  router.post("/register", authController.register.bind(authController));
  router.post("/login", authController.login.bind(authController));
  router.get("/validate", authController.validateToken.bind(authController));

  return router;
};
