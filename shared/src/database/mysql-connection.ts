import mysql, { Pool, PoolOptions } from "mysql2/promise";

export class MySQLConnection {
  private static instance: Pool;

  private constructor() {}

  public static init(config: PoolOptions) {
    if (!MySQLConnection.instance) {
      MySQLConnection.instance = mysql.createPool(config);
    }
  }

  public static getInstance(): Pool {
    if (!MySQLConnection.instance) {
      throw new Error("MySQLConnection not initialized. Call init() first.");
    }
    return MySQLConnection.instance;
  }
}
