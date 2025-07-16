import { Request, Response } from "express";
import { IUseCase } from "../../../../shared/core/IUseCase";

export default class DeleteTaskController {
  constructor(private deleteTaskUseCase: IUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ error: "ID da tarefa é obrigatório" });

      await this.deleteTaskUseCase.execute({ id });

      return res.status(204).send(); // 204 = No Content
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      return res.status(500).json({ error: "Erro ao deletar tarefa." });
    }
  }
}
