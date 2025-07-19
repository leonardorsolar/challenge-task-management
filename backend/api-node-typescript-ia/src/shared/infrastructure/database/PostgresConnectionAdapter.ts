// import { Pool, PoolClient } from "pg";
// import IConnection from "./IConnection";
// import { createTableScripts } from "./createTablesDB";

// // docker-compose down -v  # Apaga volumes e containers
// // docker-compose up --build
// // docker-compose up --build
// // docker-compose logs -f
// // docker-compose down
// //docker network ls
// // docker network rm app-network  # Para garantir que seja recriada corretamente
// // docker-compose up -d

// export class PostgresConnectionAdapter implements IConnection {
//   private static instance: PostgresConnectionAdapter;
//   private pool: Pool;

//   constructor() {
//     console.log(`Carregando .env`);
//     console.log(`Ambiente: ${process.env.NODE_ENV}`);
//     console.log(`Usuário do banco: ${process.env.DB_USER}`);
//     console.log(`Banco de dados: ${process.env.DB_NAME}`);
//     console.log(`Host do banco: ${process.env.DB_HOST}`);
//     this.pool = new Pool({
//       //connectionString: process.env.DATABASE_URL, // ou use host, user, etc individualmente
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT || "5432"),
//       user: process.env.DB_USER || "postgres",
//       password: process.env.DB_PASSWORD || "vetlara2025",
//       database: process.env.DB_NAME || "vetprofissional_db",
//     });
//     console.log(`Nome do banco configurado: ${this.pool.options.database}`);
//   }
//   // Class Object Builder (Singleton)
//   static getInstance(): PostgresConnectionAdapter {
//     if (!PostgresConnectionAdapter.instance) {
//       PostgresConnectionAdapter.instance = new PostgresConnectionAdapter();
//     }
//     return PostgresConnectionAdapter.instance;
//   }

//   async query(sql: string, params: any[] = [], client?: PoolClient): Promise<any> {
//     try {
//       const executor = client ?? this.pool;
//       const result = await executor.query(sql, params);
//       return result.rows;
//     } catch (error) {
//       console.error("Erro ao executar query:", error);
//       throw error;
//     }
//   }

//   async beginTransaction(): Promise<PoolClient> {
//     const client = await this.pool.connect();
//     await client.query("BEGIN");
//     return client;
//   }

//   async commit(client: PoolClient): Promise<void> {
//     await client.query("COMMIT");
//     client.release();
//   }

//   async rollback(client: PoolClient): Promise<void> {
//     await client.query("ROLLBACK");
//     client.release();
//   }

//   async insert(sql: string, params?: any[]): Promise<any> {
//     try {
//       //console.log("Executando inserção:", sql);
//       //console.log("Parâmetros:", params);

//       const result = await this.pool.query(sql, params);

//       // console.log("Resultado da inserção:", {
//       //   command: result.command,
//       //   rowCount: result.rowCount,
//       //   returnedId: result.rows.length > 0 ? result.rows[0].id : "Nenhum ID retornado",
//       // });

//       // Verifica se a inserção foi bem-sucedida
//       if (result.rowCount === 0) {
//         throw new Error("Inserção falhou: nenhuma linha foi afetada");
//       }

//       return result.rows.length > 0 ? result.rows[0] : { success: true, rowCount: result.rowCount };
//     } catch (error) {
//       console.error("Erro ao executar inserção:", error);
//       throw error;
//     }
//   }
//   async createTablesDB(nome_bd: string): Promise<any> {
//     console.log(`createTablesDB`);
//     console.log(`Nome do Banco: ${nome_bd}`);
//     const client = await this.pool.connect();
//     try {
//       await client.query("BEGIN");

//       for (const [index, script] of createTableScripts.entries()) {
//         // Regex para extrair o nome da tabela após "CREATE TABLE IF NOT EXISTS"
//         const match = script.match(/CREATE TABLE IF NOT EXISTS (\S+)/i);
//         const tableName = match ? match[1] : `desconhecida_${index + 1}`;

//         console.log(`Criando tabela '${tableName}' (${index + 1}/${createTableScripts.length})...`);
//         await client.query(script);
//         console.log(`✅ Tabela '${tableName}' criada com sucesso.`);
//       }

//       // Inserção do usuário padrão
//       console.log("Inserindo usuário padrão...");
//       const insertUserQuery = `
//             INSERT INTO users (
//                 external_id,
//                 email,
//                 name,
//                 password,
//                 status,
//                 available_credits,
//                 total_credits_consumed
//             ) VALUES (
//                 'ext-123456',
//                 'usuario@example.com',
//                 'João da Silva',
//                 'vetprofissional2025',
//                 'active',
//                 1666,
//                 0
//             )
//             ON CONFLICT (email) DO NOTHING; -- Previne erro em caso de duplicação de email
//         `;
//       await client.query(insertUserQuery);
//       console.log("✅ Usuário padrão inserido com sucesso.");

//       await client.query("COMMIT");
//       console.log("Todas as tabelas foram criadas com sucesso!");
//     } catch (error) {
//       await client.query("ROLLBACK");
//       console.error("❌ Erro ao criar tabelas:", error);
//       throw error;
//     } finally {
//       client.release();
//     }
//   }
//   async close(): Promise<void> {
//     await this.pool.end();
//   }
// }

// // import pgp from "pg-promise";
// // import IConnection from "./IConnection";

// // export default class PgPromiseConnectionAdapter implements IConnection {
// //   pgp: any;
// //   //static instance: PostgreSQLConnectionAdapter;
// //   constructor() {
// //     this.pgp = pgp()("postgres://postgres:tmHiI37LaeBV4YeVRw3ey079_wzg75ac@localhost:5432/cgtwovnf");
// //     //You are now connected to database "postgres" as user "postgres".
// //   }
// //   // constructor() {
// //   //   this.connection = pgp()("postgres://admin:12345@localhost:5440/auth_db");
// //   // }

// //   // static getInstance() {
// //   //   if (!PostgreSQLConnectionAdapter.instance) {
// //   //     PostgreSQLConnectionAdapter.instance = new PostgreSQLConnectionAdapter();
// //   //   }
// //   //   return PostgreSQLConnectionAdapter.instance;
// //   // }
// //   async query(statement: string, params: any): Promise<any> {
// //     return this.pgp.query(statement, params);
// //   }

// //   async close(): Promise<void> {
// //     return this.pgp.$pool.end();
// //   }
// // }
