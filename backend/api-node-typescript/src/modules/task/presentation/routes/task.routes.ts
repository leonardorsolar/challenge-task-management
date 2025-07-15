// src/modules/user/presentation/routes/user.routes.ts

import { Router } from "express";
import { SqliteConnectionAdapter } from "../../../../shared/infrastructure/database/SqliteConnectionAdapter";
import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";
import { CreateTaskUseCase } from "../../application/usecases/CreateTaskUseCase";
import CreateTaskController from "../controllers/CreateTaskController";
import ListTasksController from "../controllers/ListTasksController";
import { ListTasksUseCase } from "../../application/usecases/ListTasksUseCase";
import { UpdateTaskUseCase } from "../../application/usecases/UpdateTaskStatusUseCase";
import UpdateTaskStatusController from "../controllers/UpdateTaskStatusController";
import UpdateTaskController from "../controllers/UpdateTaskStatusController";

const taskRouter = Router();
const connection = new SqliteConnectionAdapter();
const taskRepository = new TaskRepository(connection);

// Create controllers and usecases
// instâncias
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const createTaskController = new CreateTaskController(createTaskUseCase);
const listTasksController = new ListTasksController(new ListTasksUseCase(taskRepository));
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const updateTaskController = new UpdateTaskController(updateTaskUseCase);
//const deleteTaskController = new DeleteTaskController(new DeleteTaskUseCase(taskRepository));

// rotas

taskRouter.get("/", (req, res) => {
  console.log("teste");
  res.json("Router Task");
});

// Routes
taskRouter.post("/", (req, res): Promise<any> => {
  return createTaskController.handle(req, res);
});
// rotas
taskRouter.get("/list", (req, res): Promise<any> => {
  return listTasksController.handle(req, res);
});
taskRouter.put("/:id", (req, res): Promise<any> => {
  return updateTaskController.handle(req, res);
});
//taskRouter.put("/:id", (req, res) => updateStatusController.handle(req, res));
//taskRouter.delete("/:id", (req, res) => deleteTaskController.handle(req, res));

export default taskRouter;
