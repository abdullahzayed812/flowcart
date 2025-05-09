import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

export const runMigrations = async (migrationDir: string, config: DBConfig) => {
  const connection = await mysql.createConnection(config);

  const files = fs.readdirSync(migrationDir).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationDir, file), "utf-8");
    console.log(`Running migration: ${file}`);
    await connection.query(sql);
  }

  await connection.end();
};
