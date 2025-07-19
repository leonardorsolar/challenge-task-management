import { Request, Response } from "express";
import { CreateMessageUseCase } from "../../application/usecases/CreateMessageUseCase";

export default class CreateMessageController {
  constructor(private createMessageUseCase: CreateMessageUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { chatId, userId, content, llmModel, generateAIResponse } = req.body;

      // Validação básica
      if (!chatId || !content) {
        return res.status(400).json({
          error: "chatId e content são obrigatórios",
        });
      }

      const result = await this.createMessageUseCase.execute({
        chatId,
        userId,
        content,
        llmModel,
        generateAIResponse,
      });

      if (result.isFailure) {
        return res.status(400).json({
          error: result.error,
        });
      }

      const { userMessage, aiResponse } = result.getValue();

      return res.status(201).json({
        success: true,
        data: {
          userMessage: {
            id: userMessage.id,
            chatId: userMessage.chatId,
            userId: userMessage.userId,
            content: userMessage.content,
            llmModel: userMessage.llmModel,
            role: userMessage.role,
            createdAt: userMessage.createdAt,
          },
          aiResponse: aiResponse
            ? {
                id: aiResponse.id,
                content: aiResponse.content,
                model: aiResponse.model,
                aiSuggestion: aiResponse.aiSuggestion,
                metadata: aiResponse.metadata,
                createdAt: aiResponse.createdAt,
              }
            : null,
        },
      });
    } catch (error) {
      console.error("Erro no CreateMessageController:", error);
      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }
}
