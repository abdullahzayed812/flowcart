import { MySQLConnection } from "./mysql-connection";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

type QueryResult = RowDataPacket[] | ResultSetHeader;

export class MySQLQueryExecutor {
  async query<T extends QueryResult = RowDataPacket[]>(sql: string, params?: any[]): Promise<T> {
    const conn = MySQLConnection.getInstance();
    const [result] = await conn.query<T>(sql, params);
    return result;
  }

  async execute<T extends QueryResult = ResultSetHeader>(sql: string, params?: any[]): Promise<T> {
    const conn = MySQLConnection.getInstance();
    const [result] = await conn.execute<T>(sql, params);
    return result;
  }
}
