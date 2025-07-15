// src/modules/task/presentation/controllers/createTaskController/index.ts
import { Request, Response } from "express";
import { IUseCase } from "../../../../shared/core/IUseCase";

export default class CreateTaskController {
  constructor(private createTaskUseCase: IUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    console.log("[CreateTaskController] Request received");

    try {
      const { title, description, status, priority, dueDate, userId } = req.body;

      // Validação mínima dos campos obrigatórios
      if (!title || !status || !priority || !userId) {
        return res.status(400).json({
          error: "Missing required fields: title, status, priority, and userId are required.",
        });
      }

      const task = await this.createTaskUseCase.execute({
        title,
        description,
        status,
        priority,
        dueDate,
        userId,
      });

      console.log("[CreateTaskController] Task created:", task);

      return res.status(201).json(task);
    } catch (error: any) {
      console.error("[CreateTaskController] Internal error:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}
