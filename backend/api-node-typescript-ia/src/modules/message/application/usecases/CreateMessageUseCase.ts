import { IUseCase } from "../../../../shared/core/IUseCase";
import { Result } from "../../../../shared/core/Result";
import Message from "../../domain/entities/Message";
import { ILLMService } from "../../../llm/domain/services/ILLMService";
import LLMResponse from "../../../llm/domain/entities/LLMResponse";

export interface CreateMessageDTO {
  chatId: string;
  userId?: string;
  content: string;
  llmModel?: string;
  generateAIResponse?: boolean;
}

export interface CreateMessageResponse {
  userMessage: Message;
  aiResponse?: LLMResponse;
}

export class CreateMessageUseCase implements IUseCase {
  constructor(private llmService: ILLMService) {}

  async execute(dto: CreateMessageDTO): Promise<Result<CreateMessageResponse>> {
    try {
      // Criar mensagem do usuário
      const userMessageResult = Message.create(
        dto.chatId,
        dto.userId || null,
        dto.content,
        dto.llmModel || "gpt-3.5-turbo",
        "user"
      );

      if (userMessageResult.isFailure) {
        return Result.fail<CreateMessageResponse>(userMessageResult.error!);
      }

      const userMessage = userMessageResult.getValue();
      let aiResponse: LLMResponse | undefined;

      // Gerar resposta da IA se solicitado
      if (dto.generateAIResponse !== false) {
        try {
          const llmResponse = await this.llmService.generateResponse({
            content: dto.content,
            model: dto.llmModel || "gpt-3.5-turbo",
            maxTokens: 1000,
            temperature: 0.7,
          });

          const aiResponseResult = LLMResponse.create(
            llmResponse.content,
            llmResponse.model,
            llmResponse.aiSuggestion,
            llmResponse.metadata
          );

          if (aiResponseResult.isSuccess) {
            aiResponse = aiResponseResult.getValue();
          }
        } catch (error) {
          console.error("Erro ao gerar resposta da IA:", error);
          // Não falha a operação se a IA não responder
        }
      }

      return Result.ok<CreateMessageResponse>({
        userMessage,
        aiResponse,
      });
    } catch (error) {
      return Result.fail<CreateMessageResponse>(`Erro ao criar mensagem: ${error}`);
    }
  }
}
