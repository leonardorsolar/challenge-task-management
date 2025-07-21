import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

export class ListMessagesUseCase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  async execute(): Promise<any[]> {
    return this.messageRepository.listAll();
  }
}
