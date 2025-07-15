// src/modules/task/application/usecases/CreateTaskUseCase.ts

import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

interface CreateTaskDTO {
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  userId: string;
}

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(data: CreateTaskDTO): Promise<Task> {
    console.log("[CreateTaskUseCase] Executing use case with data:", data);

    // (Opcional) Verificar se o título é único por usuário, por exemplo
    // const existingTask = await this.taskRepository.findByTitleAndUserId(data.title, data.userId);
    // if (existingTask) {
    //   throw new Error(`Task with title "${data.title}" already exists for this user`);
    // }

    console.log("[CreateTaskUseCase] Executing use case with data:", data);

    const taskOrError = Task.create(
      data.title,
      data.description,
      data.status,
      data.priority,
      data.dueDate ? new Date(data.dueDate) : undefined,
      data.userId,
      undefined, // id
      new Date(), // created_at
      new Date() // updated_at
    );
    console.log(taskOrError);

    if (taskOrError.isLeft()) {
      throw new Error(taskOrError.value.message);
    }

    const task = taskOrError.value.getValue(); // Extrai a instância da entidade Task
    console.log("[CreateTaskUseCase] Task entity created:", task);

    const output = await this.taskRepository.create(task);
    console.log("[CreateTaskUseCase] Task saved to repository:", output);

    return output;
  }
}
