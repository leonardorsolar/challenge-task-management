import Message from "../entities/Message";

export interface IMessageRepository {
  save(message: any): Promise<void>;
  findByChatId(chatId: string): Promise<Message[]>;
  findById(id: string): Promise<Message | null>;
  // findByChatId(chatId: string): Promise<Message[]>;
  // outros métodos necessários
}
// export interface IMessageRepository {
//   findById(id: string): Promise<Message | null>;
//   findByChatId(chatId: string): Promise<Message[]>;
//   create(message: Omit<Message, 'id' | 'createdAt'>): Promise<Message>;
//   delete(id: string): Promise<void>;
//   deleteAllByChatId(chatId: string): Promise<void>;
// }
