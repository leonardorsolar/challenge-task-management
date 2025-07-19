export default interface IConnection {
  query(sql: string, params?: any[]): Promise<any>;
  insert(sql: string, params?: any[]): Promise<any>;
  beginTransaction(): Promise<any>;
  commit(): Promise<any>;
  rollback(): Promise<any>;
  createTablesDB(nome_bd?: string): Promise<any>;
  close(): Promise<void>;
}
