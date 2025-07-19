// import mysql from "mysql2/promise";
// import IConnection from "./IConnection";

// export class MySQLConnectionAdapter implements IConnection {
//   private static instance: MySQLConnectionAdapter;
//   private pool: mysql.Pool;

//   private constructor() {
//     this.pool = mysql.createPool({
//       uri: process.env.DATABASE_URL,
//     });
//   }

//   static getInstance(): MySQLConnectionAdapter {
//     if (!MySQLConnectionAdapter.instance) {
//       MySQLConnectionAdapter.instance = new MySQLConnectionAdapter();
//     }
//     return MySQLConnectionAdapter.instance;
//   }

//   async query(sql: string, params: any[] = []): Promise<any> {
//     const [rows] = await this.pool.execute(sql, params);
//     return rows;
//   }

//   async createTablesDB(nome_bd: string): Promise<void> {
//     const connection = await this.pool.getConnection();
//     try {
//       await connection.beginTransaction();

//       // scripts importados de outro arquivo, igual ao PostgreSQL
//       for (const script of createTableScripts) {
//         await connection.query(script);
//       }

//       await connection.commit();
//     } catch (error) {
//       await connection.rollback();
//       throw error;
//     } finally {
//       connection.release();
//     }
//   }
// }
