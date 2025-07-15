import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(data: {
    id: string;
    title: string;
    description?: string;
    status: "pending" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    dueDate?: string;
    userId: string;
  }) {
    const existing = await this.taskRepository.findById(data.id);
    if (!existing) throw new Error("Tarefa não encontrada");

    const updatedTask = existing.update({
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      //userId: data.userId,
    });

    return await this.taskRepository.update(updatedTask);
  }
}
