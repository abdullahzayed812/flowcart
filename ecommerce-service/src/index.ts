import dotenv from "dotenv";
// import path from "node:path";
// import { fileURLToPath } from "node:url";

// import { runMigrations, runSeeds } from "@shared/index";

import { createServer } from "./server";

import "./database/db.connection";
// import { ecommerceDB } from "./database/db.config";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const migrationsPath = path.join(__dirname, "database", "migrations");
// const seedsPath = path.join(__dirname, "database", "seeds");

(async () => {
  dotenv.config();

  const { ENV, PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  if (!ENV || !PORT || !DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.error("Missing some required env variables.");
    process.exit(1);
  }

  // await runMigrations(migrationsPath, ecommerceDB);
  // await runSeeds(seedsPath, ecommerceDB);
  // console.log("✅ Ecommerce DB is ready");

  const server = await createServer();

  server.listen(PORT, () => console.log(`Listening on port ${PORT} in ${ENV} environment.`));
})();
