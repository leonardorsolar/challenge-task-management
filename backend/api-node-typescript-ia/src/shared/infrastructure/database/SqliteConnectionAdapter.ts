import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import IConnection from "./IConnection"; // sua interface genérica
import { createTableScripts } from "./createTablesDB"; // scripts reaproveitados
import fs from "fs";

export class SqliteConnectionAdapter implements IConnection {
  private static instance: SqliteConnectionAdapter;
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  constructor() {}

  static getInstance(): SqliteConnectionAdapter {
    if (!SqliteConnectionAdapter.instance) {
      SqliteConnectionAdapter.instance = new SqliteConnectionAdapter();
    }
    return SqliteConnectionAdapter.instance;
  }

  async connect(): Promise<void> {
    if (!this.db) {
      const dbPath = path.resolve(__dirname, "jumpad.sqlite");
      const fileExists = fs.existsSync(dbPath);

      this.db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });

      if (!fileExists) {
        console.log("Arquivo SQLite criado:", dbPath);
      }

      console.log("✅ Conectado ao banco SQLite");
    }
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    await this.connect();
    try {
      const result = await this.db.all(sql, params);
      return result;
    } catch (error) {
      console.error("Erro ao executar query:", error);
      throw error;
    }
  }

  async insert(sql: string, params: any[] = []): Promise<any> {
    await this.connect();
    try {
      const result = await this.db.run(sql, params);
      return { lastID: result.lastID, changes: result.changes };
    } catch (error) {
      console.error("Erro ao executar inserção:", error);
      throw error;
    }
  }

  async beginTransaction(): Promise<void> {
    await this.connect();
    await this.db.exec("BEGIN TRANSACTION");
  }

  async commit(): Promise<void> {
    await this.db.exec("COMMIT");
  }

  async rollback(): Promise<void> {
    await this.db.exec("ROLLBACK");
  }

  async createTablesDB(): Promise<void> {
    await this.connect();

    try {
      console.log("🔧 Criando/verificando tabelas no SQLite...");
      await this.beginTransaction();

      for (const [index, script] of createTableScripts.entries()) {
        const match = script.match(/CREATE TABLE IF NOT EXISTS (\S+)/i);
        const tableName = match ? match[1] : `desconhecida_${index + 1}`;
        console.log(`🛠 Criando tabela '${tableName}' (${index + 1}/${createTableScripts.length})...`);
        await this.db.exec(script);
        console.log(`✅ Tabela '${tableName}' criada/verificada.`);
      }

      console.log("Inserindo usuário padrão...");
      await this.db.run(`
        INSERT OR IGNORE INTO users (
          id,
          email,
          name,
          password
        ) VALUES (
          '1',
          'usuario@jumpad.com',
          'João da Silva',
          '123456'
        );
      `);
      console.log("✅ Usuário padrão inserido/verificado.");

      await this.commit();
      console.log("🏁 Tabelas criadas/verificadas com sucesso!");
    } catch (error) {
      await this.rollback();
      console.error("❌ Erro ao criar tabelas no SQLite:", error);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.db.close();
    console.log("🔒 Conexão SQLite encerrada.");
  }
}
