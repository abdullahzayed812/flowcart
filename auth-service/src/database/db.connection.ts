import { MySQLConnection } from "@shared/index";

MySQLConnection.init({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = MySQLConnection.getInstance();
