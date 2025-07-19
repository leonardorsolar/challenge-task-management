export const createTableScripts = [
  `
   CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE, -- Já com CASCADE para exclusão de mensagens quando o chat for deletado
    user_id UUID,
    content TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('user', 'assistant')) NOT NULL,
    llm_model TEXT, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
  `,
];
