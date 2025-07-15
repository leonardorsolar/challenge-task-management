// src/modules/task/domain/entities/Task.ts
import { randomUUID } from "crypto";
import AppError from "../../../../shared/core/AppError";
import { Either, left, right } from "../../../../shared/core/Either";
import { Result } from "../../../../shared/core/Result";

export class Task {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly status: "pending" | "in_progress" | "completed",
    public readonly priority: "low" | "medium" | "high",
    public readonly dueDate: Date | null,
    public readonly userId: string,
    public readonly created_at: Date,
    public readonly updated_at: Date
  ) {}

  public static create(
    title: string,
    description?: string,
    status: "pending" | "in_progress" | "completed" = "pending",
    priority: "low" | "medium" | "high" = "medium",
    dueDate?: Date,
    userId?: string,
    id?: string,
    created_at?: Date,
    updated_at?: Date
  ): Either<AppError, Result<Task>> {
    // Validação básica
    if (!title || !title.trim()) {
      return left(new AppError("Title is required."));
    }

    if (!userId) {
      return left(new AppError("UserId is required."));
    }

    const validStatuses = ["pending", "in_progress", "completed"];
    if (!validStatuses.includes(status)) {
      return left(new AppError("Invalid status."));
    }

    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      return left(new AppError("Invalid priority."));
    }

    const task = new Task(
      id || randomUUID(),
      title.trim(),
      description || null,
      status,
      priority,
      dueDate || null,
      userId,
      created_at || new Date(),
      updated_at || new Date()
    );

    return right(Result.ok<Task>(task));
  }

  public update(props: {
    title?: string;
    description?: string;
    status?: "pending" | "in_progress" | "completed";
    priority?: "low" | "medium" | "high";
    dueDate?: Date | null;
  }): Task {
    return new Task(
      this.id,
      props.title || this.title,
      props.description !== undefined ? props.description : this.description,
      props.status || this.status,
      props.priority || this.priority,
      props.dueDate !== undefined ? props.dueDate : this.dueDate,
      this.userId,
      this.created_at,
      new Date()
    );
  }

  public markAsCompleted(): Task {
    return new Task(
      this.id,
      this.title,
      this.description,
      "completed",
      this.priority,
      this.dueDate,
      this.userId,
      this.created_at,
      new Date()
    );
  }
}
