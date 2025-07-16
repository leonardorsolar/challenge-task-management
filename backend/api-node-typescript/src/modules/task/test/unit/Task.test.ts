import { Result } from "../../../../shared/core/Result";
import AppError from "../../../../shared/core/AppError";
import { Task } from "../../domain/entities/Task";

describe("Task Entity", () => {
  const validData = {
    title: "Test Task",
    description: "Test description",
    status: "pending" as const,
    priority: "medium" as const,
    dueDate: new Date("2025-12-31"),
    userId: "user-123",
  };

  it("should create a valid Task", () => {
    const result = Task.create(
      validData.title,
      validData.description,
      validData.status,
      validData.priority,
      validData.dueDate,
      validData.userId
    );

    expect(result.isRight()).toBe(true);
    const taskResult = result.value as Result<Task>;
    expect(taskResult.isSuccess).toBe(true);
    const task = taskResult.getValue();
    expect(task.title).toBe(validData.title);
    expect(task.description).toBe(validData.description);
    expect(task.status).toBe(validData.status);
    expect(task.priority).toBe(validData.priority);
    expect(task.dueDate).toEqual(validData.dueDate);
    expect(task.userId).toBe(validData.userId);
  });

  it("should fail if title is empty", () => {
    const result = Task.create("", "desc", "pending", "low", new Date(), "user-123");
    expect(result.isLeft()).toBe(true);
    expect((result.value as AppError).message).toBe("Title is required.");
  });

  it("should fail if userId is not provided", () => {
    const result = Task.create("Task without user");
    expect(result.isLeft()).toBe(true);
    expect((result.value as AppError).message).toBe("UserId is required.");
  });

  it("should fail if status is invalid", () => {
    const result = Task.create("Task", "desc", "invalid" as any, "low", new Date(), "user-123");
    expect(result.isLeft()).toBe(true);
    expect((result.value as AppError).message).toBe("Invalid status.");
  });

  it("should fail if priority is invalid", () => {
    const result = Task.create("Task", "desc", "pending", "extreme" as any, new Date(), "user-123");
    expect(result.isLeft()).toBe(true);
    expect((result.value as AppError).message).toBe("Invalid priority.");
  });

  it("should update task properties correctly", () => {
    const task = (
      Task.create("Old Title", "Old desc", "pending", "medium", undefined, "user-123").value as Result<Task>
    ).getValue();
    const updated = task.update({
      title: "New Title",
      description: "New desc",
      status: "in_progress",
      priority: "high",
    });

    expect(updated.title).toBe("New Title");
    expect(updated.description).toBe("New desc");
    expect(updated.status).toBe("in_progress");
    expect(updated.priority).toBe("high");
    expect(updated.updated_at.getTime()).toBeGreaterThanOrEqual(task.updated_at.getTime());
  });

  it("should mark task as completed", () => {
    const task = (
      Task.create("To Complete", "desc", "in_progress", "low", undefined, "user-123").value as Result<Task>
    ).getValue();
    const completedTask = task.markAsCompleted();

    expect(completedTask.status).toBe("completed");
    expect(completedTask.updated_at.getTime()).toBeGreaterThanOrEqual(task.updated_at.getTime());
  });
});
