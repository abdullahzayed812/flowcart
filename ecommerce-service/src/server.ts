import express from "express";
import cors from "cors";

import { errorHandlerMiddleware } from "@shared/index";
import { requestLoggerMiddleware } from "@shared/index";

export async function createServer(logRequests: boolean = true) {
  const app = express();

  app.use(express.json());
  app.use(cors());

  if (logRequests) {
    app.use(requestLoggerMiddleware);
  }

  app.use(errorHandlerMiddleware);

  return app;
}
