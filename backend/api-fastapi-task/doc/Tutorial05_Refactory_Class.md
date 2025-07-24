**refatorar o código usando classes**, **inversão de dependência** e **desacoplamento entre `domain` e `usecase`**, criando interfaces e aplicando os princípios **SOLID**, especialmente o **D** (Dependency Inversion).

---

## ✅ Objetivo

Refatorar para que:

-   O **usecase** não dependa da implementação do repositório.
-   O **domínio** seja independente da aplicação ou infraestrutura.
-   Tudo esteja organizado e escalável para crescimento futuro.

---

## 🗂️ Estrutura Final das Pastas

```
app/
├── modules/
│   └── task/
│       ├── domain/
│       │   ├── entities/
│       │   │   └── task.py
│       │   └── repositories/
│       │       └── task_repository_interface.py
│       ├── application/
│       │   └── usecases/
│       │       └── create_task_usecase.py
│       ├── infrastructure/
│       │   └── repositories/
│       │       └── task_repository.py
│       └── presentation/
│           ├── controllers/
│           │   └── create_task_controller.py
│           └── routes/
│               └── task_routes.py
```

---

## 📄 `task.py` – Entidade (Domain)

```python
class Task:
    def __init__(self, title: str, description: str):
        self.title = title
        self.description = description
```

---

## 📄 `task_repository_interface.py` – Interface do Repositório (Domain)

```python
from abc import ABC, abstractmethod
from app.modules.task.domain.entities.task import Task

class TaskRepositoryInterface(ABC):
    @abstractmethod
    def save(self, task: Task) -> dict:
        pass
```

---

## 📄 `create_task_usecase.py` – Use Case (Application)

```python
from app.modules.task.domain.entities.task import Task
from app.modules.task.domain.repositories.task_repository_interface import TaskRepositoryInterface

class CreateTaskUseCase:
    def __init__(self, repository: TaskRepositoryInterface):
        self.repository = repository

    def execute(self, data: dict) -> dict:
        print("[CreateTaskUseCase] Executando lógica...")
        task = Task(title=data["title"], description=data["description"])
        return self.repository.save(task)
```

---

## 📄 `task_repository.py` – Repositório (Infrastructure)

```python
from app.modules.task.domain.repositories.task_repository_interface import TaskRepositoryInterface
from app.modules.task.domain.entities.task import Task

class TaskRepository(TaskRepositoryInterface):
    def save(self, task: Task) -> dict:
        print("[TaskRepository] Simulando salvamento no banco...")
        return {
            "id": 1,
            "title": task.title,
            "description": task.description
        }
```

---

## 📄 `create_task_controller.py` – Controller (Presentation)

```python
from app.modules.task.infrastructure.repositories.task_repository import TaskRepository
from app.modules.task.application.usecases.create_task_usecase import CreateTaskUseCase

class CreateTaskController:
    def __init__(self):
        repository = TaskRepository()
        self.usecase = CreateTaskUseCase(repository)

    def handle(self):
        print("[CreateTaskController] Recebendo requisição...")

        # Simulando dados de entrada
        data = {
            "title": "Nova tarefa",
            "description": "Descrição da tarefa"
        }

        result = self.usecase.execute(data)
        return {"message": "Tarefa criada com sucesso", "data": result}


# Instância para ser usada na rota
create_task_controller = CreateTaskController()
```

---

## 📄 `task_routes.py` – Rota (Presentation)

```python
from fastapi import APIRouter
from app.modules.task.presentation.controllers.create_task_controller import create_task_controller

router = APIRouter()

@router.post("/")
def create_task():
    return create_task_controller.handle()
```

---

## ✅ Benefícios dessa Abordagem

| Princípio SOLID                | Aplicação no Código                                                         |
| ------------------------------ | --------------------------------------------------------------------------- |
| **S**: Responsabilidade única  | Cada classe tem uma função única                                            |
| **O**: Aberto/Fechado          | Novos repositórios ou entidades podem ser criados sem alterar os existentes |
| **L**: Substituição de Liskov  | A interface permite substituir o repositório                                |
| **I**: Segregação de Interface | A interface do repositório define apenas o necessário                       |
| **D**: Inversão de dependência | O usecase depende da interface, não da implementação                        |

---
