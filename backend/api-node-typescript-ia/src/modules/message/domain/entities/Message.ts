//deve conter apenas regras de negócio e dados essenciais, sem dependência de bibliotecas externas (como Express, Zod, Axios, etc).
import { Result } from "../../../../shared/core/Result";
import { v4 as uuidv4 } from "uuid"; // Importando a função para gerar UUID

export default class Message {
  constructor(
    public readonly id: string,
    public readonly userId: string | null,
    public readonly content: string,
    public readonly llmModel: string,
    public readonly createdAt: Date
  ) {}

  // factory method
  static create(
    userId: string | null,
    content: string,
    llmModel: string,
    id?: string,
    createdAt?: Date
  ): Result<Message> {
    if (!content || content.trim().length === 0) {
      return Result.fail<Message>("O conteúdo da mensagem não pode estar vazio.");
    }

    if (!llmModel || typeof llmModel !== "string") {
      return Result.fail<Message>("O modelo de IA é obrigatório.");
    }

    const messageId = id || uuidv4();
    const messageCreatedAt = createdAt || new Date();

    const message = new Message(messageId, userId, content, llmModel, messageCreatedAt);

    return Result.ok<Message>(message);
  }
}
