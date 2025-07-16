import { CreateTaskUseCase } from "../../application/usecases/CreateTaskUseCase";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

// Mock In-Memory Repository
class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  // Implemente isso se usar verificação de título no futuro
  async findByTitleAndUserId(title: string, userId: string): Promise<Task | null> {
    return this.tasks.find((t) => t.title === title && t.userId === userId) || null;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((t) => t.id === id) || null;
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) this.tasks[index] = task;
    return task;
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}

describe("CreateTaskUseCase Integration Test", () => {
  let taskRepository: InMemoryTaskRepository;
  let createTaskUseCase: CreateTaskUseCase;

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();
    createTaskUseCase = new CreateTaskUseCase(taskRepository);
  });

  it("should create a new task successfully", async () => {
    const input = {
      title: "Integration Task",
      description: "This is a test task",
      status: "pending" as const,
      priority: "medium" as const,
      dueDate: "2025-12-31",
      userId: "user-123",
    };

    const createdTask = await createTaskUseCase.execute(input);

    expect(createdTask).toBeDefined();
    expect(createdTask.id).toBeDefined();
    expect(createdTask.title).toBe(input.title);
    expect(createdTask.description).toBe(input.description);
    expect(createdTask.status).toBe(input.status);
    expect(createdTask.priority).toBe(input.priority);
    expect(createdTask.dueDate?.toISOString()).toBe(new Date(input.dueDate).toISOString());
    expect(createdTask.userId).toBe(input.userId);
    expect(createdTask.created_at).toBeInstanceOf(Date);
    expect(createdTask.updated_at).toBeInstanceOf(Date);

    const allTasks = await taskRepository.findAll();
    expect(allTasks.length).toBe(1);
    expect(allTasks[0].id).toBe(createdTask.id);
  });

  it("should throw an error if title is empty", async () => {
    const input = {
      title: " ",
      description: "Invalid task",
      status: "pending" as const,
      priority: "low" as const,
      dueDate: "2025-10-01",
      userId: "user-456",
    };

    await expect(createTaskUseCase.execute(input)).rejects.toThrow("Title is required.");
  });

  it("should throw an error if userId is missing", async () => {
    const input = {
      title: "No User Task",
      description: "Missing userId",
      status: "pending" as const,
      priority: "low" as const,
      dueDate: "2025-10-01",
      userId: "", // <- problema
    };

    await expect(createTaskUseCase.execute(input)).rejects.toThrow("UserId is required.");
  });
});
