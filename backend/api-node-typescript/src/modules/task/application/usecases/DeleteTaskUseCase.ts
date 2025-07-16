import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(data: { id: string }) {
    const task = await this.taskRepository.findById(data.id);
    if (!task) throw new Error("Tarefa não encontrada");

    await this.taskRepository.delete(data.id);
  }
}
