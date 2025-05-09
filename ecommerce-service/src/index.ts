import dotenv from "dotenv";
import { createServer } from "./server";
import { MySQLConnection } from "@shared/index";
import "./database/db";

(async () => {
  dotenv.config();

  const { ENV, PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

  if (!ENV || !PORT || !DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
    console.error("Missing some required env variables.");
    process.exit(1);
  }

  MySQLConnection.init({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const server = await createServer();

  server.listen(PORT, () => console.log(`Listening on port ${PORT} in ${ENV} environment.`));
})();
