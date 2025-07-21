import Message from "../entities/Message";

export interface IMessageRepository {
  save(data: any): Promise<void>;
  listAll(): Promise<any[]>;
  findById(id: string): Promise<Message | null>;
}
