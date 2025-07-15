// src/modules/task/infrastructure/repositories/TaskRepository.ts

import AppError from "../../../../shared/core/AppError";
import IConnection from "../../../../shared/infrastructure/database/IConnection";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class TaskRepository implements ITaskRepository {
  constructor(private readonly connection: IConnection) {}

  async create(task: Task): Promise<Task> {
    const query = `
      INSERT INTO tasks (
        id, title, description, status, priority, due_date, user_id, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    const values = [
      task.id,
      task.title,
      task.description,
      task.status,
      task.priority,
      task.dueDate,
      task.userId,
      task.created_at.toISOString(),
      task.updated_at.toISOString(),
    ];

    await this.connection.insert(query, values);

    return task;
  }

  async findById(id: string): Promise<Task | null> {
    const query = `SELECT * FROM tasks WHERE id = $1`;
    const result = await this.connection.query(query, [id]);

    if (!result || result.length === 0) return null;

    return this.mapToEntity(result[0]);
  }

  async findAll(filter?: { status?: "pending" | "in_progress" | "completed" }): Promise<Task[]> {
    let query = `SELECT * FROM tasks`;
    const values: any[] = [];

    if (filter?.status) {
      query += ` WHERE status = $1 ORDER BY created_at DESC`;
      values.push(filter.status);
    } else {
      query += ` ORDER BY created_at DESC`;
    }

    const result = await this.connection.query(query, values);

    return result.map((row: any) => this.mapToEntity(row));
  }

  async update(task: Task): Promise<Task> {
    const query = `
      UPDATE tasks
      SET 
        title = $1,
        description = $2,
        status = $3,
        priority = $4,
        due_date = $5,
        updated_at = $6
      WHERE id = $7
    `;

    const values = [
      task.title,
      task.description,
      task.status,
      task.priority,
      task.dueDate,
      task.updated_at.toISOString(),
      task.id,
    ];

    await this.connection.query(query, values);

    return task;
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM tasks WHERE id = $1`;
    await this.connection.query(query, [id]);
  }

  private mapToEntity(row: any): Task {
    const taskOrError = Task.create(
      row.title,
      row.description,
      row.status,
      row.priority,
      row.due_date ? new Date(row.due_date) : undefined,
      row.user_id,
      row.id,
      new Date(row.created_at),
      new Date(row.updated_at)
    );

    if (taskOrError.isLeft()) {
      throw new AppError(taskOrError.value.toString(), 400);
    }

    return taskOrError.value.getValue();
  }
}
