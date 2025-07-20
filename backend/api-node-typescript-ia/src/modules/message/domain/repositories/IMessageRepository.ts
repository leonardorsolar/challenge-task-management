import Message from "../entities/Message";

export interface IMessageRepository {
  save(data: any): Promise<void>;
  findById(id: string): Promise<Message | null>;
}
