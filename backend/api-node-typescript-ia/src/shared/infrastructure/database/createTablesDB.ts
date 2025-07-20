export const createTableScripts = [
  `
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY, -- UUID como string gerado pela aplicação
    user_id TEXT,
    content TEXT NOT NULL,
    llm_model TEXT,
    generateAIResponse TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
  );
  `,
];
