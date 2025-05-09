import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

export const runSeeds = async (seedDir: string, config: DBConfig) => {
  const connection = await mysql.createConnection(config);

  const files = fs.readdirSync(seedDir).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(seedDir, file), "utf-8");
    console.log(`Running seed: ${file}`);
    await connection.query(sql);
  }

  await connection.end();
};
