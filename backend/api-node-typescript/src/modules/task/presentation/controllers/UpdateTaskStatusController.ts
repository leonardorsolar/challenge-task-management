import { Request, Response } from "express";
import { IUseCase } from "../../../../shared/core/IUseCase";

export default class UpdateTaskController {
  constructor(private updateTaskUseCase: IUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description, status, priority, dueDate, userId } = req.body;

      if (!title || !status || !priority || !userId) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes" });
      }

      const updatedTask = await this.updateTaskUseCase.execute({
        id,
        title,
        description,
        status,
        priority,
        dueDate,
        userId,
      });

      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      return res.status(500).json({ error: "Erro ao atualizar tarefa." });
    }
  }
}
