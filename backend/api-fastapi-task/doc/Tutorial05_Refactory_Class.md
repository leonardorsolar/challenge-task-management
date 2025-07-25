Claro! Abaixo está o **tutorial melhorado e expandido**, incluindo explicações dos **padrões de projeto adotados**, como o **Factory**, aplicação prática de **inversão de dependência**, uso de **interfaces**, princípios **SOLID**, e criação de um **container simples para injeção de dependência em Python**.

---

# ✅ Tutorial: Arquitetura Limpa com SOLID, Factory e Inversão de Dependência

## 🎯 Objetivo

Refatorar a aplicação para:

-   Separar **responsabilidades** (SRP).
-   Aplicar **inversão de dependência** (DIP).
-   Tornar o sistema **testável**, **extensível** e **desacoplado**.
-   Adotar boas práticas como **interfaces**, **injeção de dependência** e **padrão Factory**.

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
│       ├── presentation/
│       │   ├── controllers/
│       │   │   └── create_task_controller.py
│       │   └── routes/
│       │       └── task_routes.py
│       └── task_container.py
```

---

## 🧩 Explicação dos Padrões de Projeto Usados

| Padrão                      | Descrição                                                                  |
| --------------------------- | -------------------------------------------------------------------------- |
| **Factory**                 | Cria instâncias de objetos sem expor a lógica de criação na camada de uso. |
| **Inversão de Dependência** | O domínio depende de **interfaces**, não de implementações concretas.      |
| **Injeção de Dependência**  | Os objetos são **injetados externamente**, facilitando testes e mudanças.  |
| **Interface**               | Define contratos desacoplados. Permite múltiplas implementações.           |

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
        """Salva a tarefa e retorna dados persistidos"""
        pass
```

---

## 📄 `create_task_usecase.py` – Use Case (Application)

```python
from app.modules.task.domain.entities.task import Task
from app.modules.task.domain.repositories.task_repository_interface import TaskRepositoryInterface

class CreateTaskUseCase:
    def __init__(self, repository: TaskRepositoryInterface):
        self.repository = repository  # injeção da dependência por interface

    def execute(self, data: dict) -> dict:
        print("[CreateTaskUseCase] Executando lógica...")
        task = Task(title=data["title"], description=data["description"])
        return self.repository.save(task)
```

---

## 📄 `task_repository.py` – Implementação do Repositório (Infrastructure)

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

## 📄 `task_container.py` – Padrão Factory/IoC Manual

Este é o **container manual** que cria as instâncias das dependências:

```python
from app.modules.task.application.usecases.create_task_usecase import CreateTaskUseCase
from app.modules.task.infrastructure.repositories.task_repository import TaskRepository
from app.modules.task.presentation.controllers.create_task_controller import CreateTaskController

class TaskContainer:
    @staticmethod
    def create_task_controller() -> CreateTaskController:
        repository = TaskRepository()  # implementa a interface
        usecase = CreateTaskUseCase(repository)
        return CreateTaskController(usecase)
```

---

## 📄 `create_task_controller.py` – Controller (Presentation)

```python
from app.modules.task.application.usecases.create_task_usecase import CreateTaskUseCase

class CreateTaskController:
    def __init__(self, usecase: CreateTaskUseCase):
        self.usecase = usecase

    def handle(self):
        print("[CreateTaskController] Recebendo requisição...")

        data = {
            "title": "Nova tarefa",
            "description": "Descrição da tarefa"
        }

        result = self.usecase.execute(data)
        return {"message": "Tarefa criada com sucesso", "data": result}
```

---

## 📄 `task_routes.py` – Rota com Controller Desacoplado

```python
from fastapi import APIRouter
from app.modules.task.task_container import TaskContainer

router = APIRouter()

@router.post("/")
def create_task():
    controller = TaskContainer.create_task_controller()
    return controller.handle()
```

---

## ✅ Benefícios da Arquitetura

| Princípio SOLID                | Aplicação no Código                                                            |
| ------------------------------ | ------------------------------------------------------------------------------ |
| **S**: Responsabilidade única  | Cada classe tem uma única função clara (entidade, use case, repo, controller). |
| **O**: Aberto/Fechado          | Adição de novos repositórios não exige modificação no usecase.                 |
| **L**: Substituição de Liskov  | O usecase aceita qualquer implementação que siga a interface.                  |
| **I**: Segregação de Interface | Interface só tem o necessário (método `save`).                                 |
| **D**: Inversão de dependência | Use case depende da **interface**, não da implementação concreta.              |

---

## 📌 Conclusão

Essa estrutura permite que você:

-   Teste os use cases sem banco real.
-   Altere o banco (ex: SQLite → PostgreSQL) sem tocar nos casos de uso.
-   Evolua a aplicação com **baixa manutenção** e **alta coesão**.
-   Use a mesma arquitetura para grandes projetos com múltiplos módulos.

---

Próximos passos:

-   ✅ Testes unitários
-   ✅ Adição de novos use cases (ex: listar tarefas)
-   ✅ Como usar com FastAPI real (requisição via `Request.body()`)
-   ✅ Exemplo com banco real (SQLAlchemy ou SQLite)

### 1. Criar e ativar o ambiente virtual (Python)

```bash
sudo python3 -m venv venv          # cria o virtualenv
source venv/bin/activate     # ativa no Linux/macOS
# .\venv\Scripts\activate    # ativa no Windows PowerShell
```

---

### 2. Instalar dependências

```bash
pip install -r requirements.txt
```

---

### 3. Rodar o servidor FastAPI

```bash
uvicorn app.main:app --reload
```

Por padrão, o servidor vai rodar em:
**[http://127.0.0.1:8000](http://127.0.0.1:8000)**

documentação:
http://localhost:8000/docs

# Claude - Melhorias
