import { Request, Response } from "express";
import { IUseCase } from "../../../../shared/core/IUseCase";

export default class ListTasksController {
  constructor(private listTasksUseCase: IUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const status = req.query.status as "pending" | "in_progress" | "completed" | undefined;
      const tasks = await this.listTasksUseCase.execute({ status });
      console.log("output", tasks);
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Erro ao listar tarefas:", error);
      return res.status(500).json({ error: "Erro interno ao listar tarefas." });
    }
  }
}
