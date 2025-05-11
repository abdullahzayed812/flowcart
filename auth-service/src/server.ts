import express from "express";
import cors from "cors";

import { errorHandlerMiddleware, JwtUtil, ServiceMapperUtil } from "@shared/index";
import { requestLoggerMiddleware } from "@shared/index";
import { UserRepository } from "./repositories/user.repository";

import { db } from "./database/db.connection";
import { HttpNotificationService } from "./services/notification.service";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { createAuthRouter } from "./routes/auth.routes";

export async function createServer(logRequests: boolean = true) {
  const app = express();

  app.use(express.json());
  app.use(cors());

  if (logRequests) {
    app.use(requestLoggerMiddleware);
  }

  const userRepository = new UserRepository(db);
  const jwtUtil = new JwtUtil(process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
  const serviceMapper = new ServiceMapperUtil();

  const notificationService = new HttpNotificationService(serviceMapper);

  const authService = new AuthService(userRepository, jwtUtil, notificationService);
  const authController = new AuthController(authService);

  app.use("/api/auth", createAuthRouter(authController));

  app.use(errorHandlerMiddleware);

  return app;
}
