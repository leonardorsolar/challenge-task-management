import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { Task } from "../../domain/entities/Task";

export class ListTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(filter?: { status?: "pending" | "in_progress" | "completed" }): Promise<Task[]> {
    return await this.taskRepository.findAll(filter);
  }
}
