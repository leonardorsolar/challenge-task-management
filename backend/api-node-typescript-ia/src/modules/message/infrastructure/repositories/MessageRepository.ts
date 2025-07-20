import AppError from "../../../../shared/core/AppError";
import IConnection from "../../../../shared/infrastructure/database/IConnection";
import Message from "../../domain/entities/Message";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

export class MessageRepository implements IMessageRepository {
  constructor(private readonly connection: IConnection) {}

  async save(data: any): Promise<void> {
    const { message, generateAIResponse } = data;
    const sql = `
      INSERT INTO messages (id, user_id, content, llm_model, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await this.connection.query(sql, [
      message.id,
      message.content,
      message.llmModel,
      generateAIResponse,
      message.createdAt.toISOString(), // garante formato ISO
    ]);
  }

  async findById(id: string): Promise<Message | null> {
    const result = await this.connection.query("SELECT * FROM messages WHERE id = $1", [id]);
    return result[0] ?? null;
  }
}
