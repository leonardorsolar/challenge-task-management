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
  aiResponse?: any;
}

type Response = Either<AppError, Result<CreateMessageResponse>>;

export class CreateMessageUseCase implements IUseCase {
  constructor(private llmService: ILLMService, private messageRepository: IMessageRepository) {}

  async execute(dto: CreateMessageDTO): Promise<Response> {
    console.log("CreateMessageUseCase");
    try {
      const userMessageResult = Message.create(dto.userId || null, dto.content, dto.llmModel || "gpt-3.5-turbo");
      console.log(userMessageResult);
      if (userMessageResult.isFailure) {
        return left(new AppError(userMessageResult.getErrorValue().toString(), 400));
      }

      const userMessage = userMessageResult.getValue();

      let aiResponseMessage;

      const llmResponse = await this.llmService.generateResponse({
        content: dto.content,
        model: dto.llmModel || "gpt-3.5-turbo",
        maxTokens: 1000,
        temperature: 0.7,
      });

      if (llmResponse.isRight()) {
        const aiResponse = llmResponse.value.getValue();
        aiResponseMessage = aiResponse;
        console.log("aiResponseMessage");
        console.log(aiResponseMessage);
        console.log(userMessage);
        const data = { userMessage, aiResponseMessage };
        await this.messageRepository.save(data);
      } else {
        console.error("Erro ao obter resposta da IA:", llmResponse.value);
      }

      return right(
        Result.ok<CreateMessageResponse>({
          userMessage,
          aiResponse: aiResponseMessage || undefined,
        })
      );
    } catch (error) {
      console.error("Erro inesperado ao executar use case:", error);
      return left(new AppError("Erro inesperado. Tente novamente mais tarde.", 500));
    }
  }
}
