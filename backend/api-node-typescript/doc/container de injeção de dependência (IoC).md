O que você está enfrentando é um acoplamento de **infraestrutura e aplicação dentro da camada de rota**, o que fere princípios como **Inversão de Dependência (D - SOLID)** e **Separação de Responsabilidades (SRP)**.

Para resolver isso, o ideal é usar um **container de injeção de dependência (IoC)** ou um **arquivo centralizador de inicialização** que instancie e injete os objetos necessários. Aqui vão duas abordagens:

---

### ✅ **Solução 1 — Usar um Container Manual (sem biblioteca externa)**

Crie um arquivo `task.container.ts` que **centraliza as instâncias** e retorna os controllers prontos para uso:

#### 📁 `src/modules/task/task.container.ts`

```ts
import { SqliteConnectionAdapter } from "../../shared/infrastructure/database/SqliteConnectionAdapter";
import { TaskRepository } from "./infrastructure/repositories/TaskRepository";
import { CreateTaskUseCase } from "./application/usecases/CreateTaskUseCase";
import { ListTasksUseCase } from "./application/usecases/ListTasksUseCase";
import { UpdateTaskUseCase } from "./application/usecases/UpdateTaskStatusUseCase";
import { DeleteTaskUseCase } from "./application/usecases/DeleteTaskUseCase";
import CreateTaskController from "./presentation/controllers/CreateTaskController";
import ListTasksController from "./presentation/controllers/ListTasksController";
import UpdateTaskStatusController from "./presentation/controllers/UpdateTaskStatusController";
import DeleteTaskController from "./presentation/controllers/DeleteTaskController";

export class TaskContainer {
  public static createTaskController(): CreateTaskController {
    const connection = new SqliteConnectionAdapter();
    const repository = new TaskRepository(connection);
    const useCase = new CreateTaskUseCase(repository);
    return new CreateTaskController(useCase);
  }

  public static listTasksController(): ListTasksController {
    const connection = new SqliteConnectionAdapter();
    const repository = new TaskRepository(connection);
    const useCase = new ListTasksUseCase(repository);
    return new ListTasksController(useCase);
  }

  public static updateTaskController(): UpdateTaskStatusController {
    const connection = new SqliteConnectionAdapter();
    const repository = new TaskRepository(connection);
    const useCase = new UpdateTaskUseCase(repository);
    return new UpdateTaskStatusController(useCase);
  }

  public static deleteTaskController(): DeleteTaskController {
    const connection = new SqliteConnectionAdapter();
    const repository = new TaskRepository(connection);
    const useCase = new DeleteTaskUseCase(repository);
    return new DeleteTaskController(useCase);
  }
}
```

---

### 🧠 **Depois, use o container nas rotas:**

#### 📁 `task.routes.ts`

```ts
import { Router } from "express";
import { TaskContainer } from "../../task.container";

const taskRouter = Router();

// Controllers
const createTaskController = TaskContainer.createTaskController();
const listTasksController = TaskContainer.listTasksController();
const updateTaskController = TaskContainer.updateTaskController();
const deleteTaskController = TaskContainer.deleteTaskController();

taskRouter.get("/", (_, res) => {
  res.json("Router Task");
});

taskRouter.post("/", (req, res) => createTaskController.handle(req, res));
taskRouter.get("/list", (req, res) => listTasksController.handle(req, res));
taskRouter.put("/:id", (req, res) => updateTaskController.handle(req, res));
taskRouter.delete("/:id", (req, res) => deleteTaskController.handle(req, res));

export default taskRouter;
```

---

### ✅ **Solução 2 — Usar uma Biblioteca de Injeção de Dependência**

Você pode usar bibliotecas como:

- [`tsyringe`](https://github.com/microsoft/tsyringe) (Microsoft)
- `inversify`

Exemplo com `tsyringe`:

```bash
npm install tsyringe reflect-metadata
```

Depois você marca suas classes com `@injectable()` e injeta com `@inject()` e resolve no container.

> Se quiser, posso montar essa solução com `tsyringe` também.

---

### 🎯 Benefícios dessa refatoração

- **Evita acoplamento direto** entre rota e casos de uso/infraestrutura.
- Facilita **testes unitários e mocks**.
- Melhora a **escalabilidade** do sistema.
- Separa as responsabilidades: rota apenas lida com rotas, container com inicialização, casos de uso com regra de negócio.

---

Quer que eu monte a estrutura completa com `tsyringe` ou prefere seguir com o container manual?
