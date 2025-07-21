// Define o tipo da tarefa que será enviada na mensagem
export interface TaskPayload {
  title: string;
  description: string;
}

// Define o tipo da mensagem padrão MCP
export interface MCPMessage<T = any> {
  command: string; // Ex: "CREATE_TASK"
  payload: T; // Dados do tipo da tarefa
  timestamp: string; // Hora da criação da mensagem
  source: string; // Origem da mensagem (ex: task-manager)
}
