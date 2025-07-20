import { IUseCase } from "../../../../shared/core/IUseCase";
import { Result } from "../../../../shared/core/Result";
import Message from "../../domain/entities/Message";
import { ILLMService } from "../../../llm/domain/services/ILLMService";
import LLMResponse from "../../../llm/domain/entities/LLMResponse";
import { Either, left, right } from "../../../../shared/core/Either";
import AppError from "../../../../shared/core/AppError";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

export interface CreateMessageDTO {
  userId?: string;
  content: string;
  llmModel?: string;
}

export interface CreateMessageResponse {
  userMessage: Message;
  aiResponse?: LLMResponse;
}

type Response = Either<AppError, Result<any>>;

export class CreateMessageUseCase implements IUseCase {
  constructor(private llmService: ILLMService, private messageRepository: IMessageRepository) {}

  async execute(dto: CreateMessageDTO): Promise<Response> {
    try {
      // Criar mensagem do usuário
      const userMessageResult = Message.create(dto.userId || null, dto.content, dto.llmModel || "gpt-3.5-turbo");

      if (userMessageResult.isFailure) {
        return left(new AppError(userMessageResult.getErrorValue().toString(), 400));
      }

      const userMessage = userMessageResult.getValue();
      let aiResponse: LLMResponse | undefined;

      try {
        const userMessageResult = Message.create(dto.userId || null, dto.content, dto.llmModel || "gpt-3.5-turbo");

        if (userMessageResult.isFailure) {
          return left(new AppError(userMessageResult.getErrorValue().toString(), 400));
        }

        const userMessage = userMessageResult.getValue();

        let aiResponseMessage: Message | undefined;

        try {
          const llmResponse = await this.llmService.generateResponse({
            content: dto.content,
            model: dto.llmModel || "gpt-3.5-turbo",
            maxTokens: 1000,
            temperature: 0.7,
          });

          if (llmResponse) {
            aiResponseMessage = llmResponse.getValue();
            await this.messageRepository.save(aiResponseMessage); // Salva a resposta da IA
          }

          return right(
            Result.ok<any>({
              userMessage,
              aiResponse: aiResponseMessage,
            })
          );
        } catch (error) {
          console.error("Erro ao gerar resposta da IA:", error);
        }
      } catch (error) {
        console.error("Erro ao gerar resposta da IA:", error);
        // Não falha a operação se a IA não responder
      }

      return right(Result.ok<any>(aiResponse));
    } catch (error) {
      return left(new AppError(`Erro inesperado. Tente novamente\n${error}`, 500));
    }
  }
}
