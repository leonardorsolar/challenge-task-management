import { Request, Response } from "express";
import { CreateMessageUseCase } from "../../../application/usecases/CreateMessageUseCase";

export default class CreateMessageController {
  constructor(private createMessageUseCase: CreateMessageUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, content, llmModel } = req.body;
      console.log(req.body);

      // Validação básica
      if (!content) {
        return res.status(400).json({
          error: "content é obrigatório",
        });
      }

      const result = await this.createMessageUseCase.execute({
        userId,
        content,
        llmModel,
      });

      if (result.isLeft()) {
        const error = result.value;
        return res.status(error.statusCode).json(error.message);
      } else {
        return res.status(201).json(result.value);
      }
    } catch (error) {
      console.error("Erro no CreateMessageController:", error);
      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }
}
