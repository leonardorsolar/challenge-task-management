import AppError from "../../../../shared/core/AppError";
import IConnection from "../../../../shared/infrastructure/database/IConnection";
import Message from "../../domain/entities/Message";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

export class MessageRepository implements IMessageRepository {
  constructor(private readonly connection: IConnection) {}

  async save(message: Message): Promise<void> {
    const sql = `
      INSERT INTO messages (id, chat_id, user_id, content, llm_model, role, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    //console.log(sql);

    const teste = {
      id: message.id,
      chatId: message.chatId,
      userId: message.userId,
      content: message.content,
      llmModel: message.llmModel,
      role: message.role,
      createdAt: message.createdAt,
    };

    //console.log(teste);

    await this.connection.query(sql, [
      message.id,
      message.chatId,
      message.userId,
      message.content,
      message.llmModel,
      message.role,
      message.createdAt,
    ]);
  }

  async findByChatId(chatId: string): Promise<Message[]> {
    try {
      const result = await this.connection.query(`SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC`, [
        chatId,
      ]);
      //console.log("findByChatId Resultado da consulta:", result);

      return result.map((message: any) => {
        const messageOrError = Message.create(
          message.chat_id,
          message.user_id,
          message.content,
          message.llm_model,
          message.role,
          message.id,
          new Date(message.created_at)
        );
        //console.log("messageOrError.getValue()");
        //console.log(messageOrError.getValue());

        if (messageOrError.isFailure) {
          //throw new Error(messageOrError.value.message);
          return new AppError(messageOrError.getErrorValue().toString(), 400);
        }

        return messageOrError.getValue();
      });
    } catch (error) {
      console.error("Error in findByChatId:", error);
      throw new Error("Failed to fetch messages for the provided chatId");
    }
  }

  async findById(id: string): Promise<Message | null> {
    const result = await this.connection.query("SELECT * FROM messages WHERE id = $1", [id]);
    return result[0] ?? null;
  }

  // async findByChatId(chatId: string): Promise<Message[]> {
  //   const result = await this.connection.query("SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC", [
  //     chatId,
  //   ]);

  //   return result.map((row: any) =>
  //     Message.create(row.chat_id, row.user_id, row.content, row.role, new Date(row.created_at), row.id)
  //   );
  // }
}

// export const messageRepository = new MessageRepository();

// import { query } from "../../../../shared/infrastructure/database/connection"
// import { Message } from "../../domain/entities/Message"
// import { IMessageRepository } from "../../domain/repositories/IMessageRepository"

// export class MessageRepository implements IMessageRepository {
//     async findById(id: string): Promise<Message | null> {
//         const messages = await query(
//             `SELECT id, chat_id as "chatId", content, role, prompt_id as "promptId",
//        created_at as "createdAt" FROM messages WHERE id = $1`,
//             [id]
//         )

//         return messages.length > 0 ? messages[0] : null
//     }

//     async findByChatId(chatId: string): Promise<Message[]> {
//         return await query(
//             `SELECT id, chat_id as "chatId", content, role, prompt_id as "promptId",
//        created_at as "createdAt" FROM messages
//        WHERE chat_id = $1 ORDER BY created_at ASC`,
//             [chatId]
//         )
//     }

//     async create(message: Omit<Message, "id" | "createdAt">): Promise<Message> {
//         const result = await query(
//             `INSERT INTO messages (chat_id, content, role, prompt_id)
//            VALUES ($1, $2, $3, $4)
//            RETURNING id, chat_id as "chatId", content, role, prompt_id as "promptId",
//            created_at as "createdAt"`,
//             [
//                 message.chatId,
//                 message.content,
//                 message.role,
//                 message.promptId || null,
//             ]
//         )

//         return result[0]
//     }

//     async delete(id: string): Promise<void> {
//         await query("DELETE FROM messages WHERE id = $1", [id])
//     }

//     async deleteAllByChatId(chatId: string): Promise<void> {
//         await query("DELETE FROM messages WHERE chat_id = $1", [chatId])
//     }
// }
