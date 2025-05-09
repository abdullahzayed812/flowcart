import dotenv from "dotenv";
import { createServer } from "./server";
import "./database/db";

(async () => {
  dotenv.config();

  const { ENV, PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  if (!ENV || !PORT || !DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.error("Missing some required env variables.");
    process.exit(1);
  }

  const server = await createServer();

  server.listen(PORT, () => console.log(`Listening on port ${PORT} in ${ENV} environment.`));
})();
