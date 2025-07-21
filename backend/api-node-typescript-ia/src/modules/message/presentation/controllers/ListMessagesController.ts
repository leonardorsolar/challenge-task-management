import { Request, Response } from "express";
import { ListMessagesUseCase } from "../../application/usecases/ListMessagesUseCase";

export default class ListMessagesController {
  constructor(private readonly listMessagesUseCase: ListMessagesUseCase) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const messages = await this.listMessagesUseCase.execute();
      return res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar mensagens" });
    }
  }
}
