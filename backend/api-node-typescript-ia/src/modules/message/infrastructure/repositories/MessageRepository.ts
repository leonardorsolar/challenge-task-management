import AppError from "../../../../shared/core/AppError";
import IConnection from "../../../../shared/infrastructure/database/IConnection";
import Message from "../../domain/entities/Message";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

export class MessageRepository implements IMessageRepository {
  constructor(private readonly connection: IConnection) {}

  async save(data: any): Promise<void> {
    console.log("save");
    console.log(data);
    const message = data.userMessage;
    const generateAIResponse = data.aiResponseMessage;

    const sql = `
  INSERT INTO messages (id, user_id, content, llm_model, created_at, generateAIResponse)
  VALUES (?, ?, ?, ?, ?, ?)
`;

    await this.connection.query(sql, [
      message.id,
      message.userId, // necessário
      message.content,
      message.llmModel,
      message.createdAt.toISOString(),
      JSON.stringify(generateAIResponse), // armazena como JSON string
    ]);
  }

  async findById(id: string): Promise<Message | null> {
    const result = await this.connection.query("SELECT * FROM messages WHERE id = $1", [id]);
    return result[0] ?? null;
  }
}
