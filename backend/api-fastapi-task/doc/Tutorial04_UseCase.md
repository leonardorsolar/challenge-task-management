módulo `task` em FastAPI respeitando a separação de camadas: **presentation (controller), application (usecase) e infrastructure (repository)**.

---

## 🎯 Objetivo

Separar as responsabilidades do sistema:

-   **Controller:** recebe a requisição HTTP.
-   **UseCase:** executa a lógica de negócio.
-   **Repository:** lida com dados (mesmo que seja um mock inicialmente).

---

## 🗂️ Estrutura de Pastas

```
app/
├── modules/
│   └── task/
│       ├── presentation/
│       │   ├── routes/
│       │   │   └── task_routes.py
│       │   └── controllers/
│       │       └── create_task_controller.py
│       ├── application/
│       │   └── usecases/
│       │       └── create_task_usecase.py
│       └── infrastructure/
│           └── repositories/
│               └── task_repository.py
```

---

## 📄 `task_routes.py` – Define a rota

```python
from fastapi import APIRouter
from app.modules.task.presentation.controllers import create_task_controller

router = APIRouter()

@router.post("/")
def create_task():
    return create_task_controller.handle()
```

---

## 📄 `create_task_controller.py` – Chama o usecase

```python
from app.modules.task.application.usecases import create_task_usecase
from app.modules.task.infrastructure.repositories import task_repository

def handle():
    print("[CreateTaskController] Chamando o usecase...")

    data = {
        "title": "Nova tarefa",  # futuramente virá do request body
        "description": "Descrição da tarefa"
    }

    result = create_task_usecase.execute(data, task_repository)
    return {"message": "Tarefa criada com sucesso", "data": result}
```

---

## 📄 `create_task_usecase.py` – Lógica de negócio

```python
def execute(data: dict, repository):
    print("[CreateTaskUseCase] Executando lógica de criação de tarefa...")

    # Regras de negócio podem ser adicionadas aqui (ex: validações)
    task = repository.save(data)
    return task
```

---

## 📄 `task_repository.py` – Simula o salvamento

```python
def save(data: dict):
    print("[TaskRepository] Salvando tarefa no banco de dados simulado...")

    task = {
        "id": 1,
        "title": data["title"],
        "description": data["description"]
    }

    return task
```

---

## ✅ Resultado da Rota

Ao fazer um `POST` para `/task/`, a cadeia será:

```
Rotas → Controller → UseCase → Repositório
```

E a resposta será:

```json
{
    "message": "Tarefa criada com sucesso",
    "data": {
        "id": 1,
        "title": "Nova tarefa",
        "description": "Descrição da tarefa"
    }
}
```

---

## 🧠 Vantagens dessa Separação (mesmo sem classes)

-   **Testável**: você pode testar o usecase ou o repositório de forma isolada.
-   **Leve**: ideal para protótipos rápidos.
-   **Desacoplado**: cada camada faz apenas o que lhe compete.
-   **Facilidade para refatorar**: depois você pode facilmente transformar os `def` em `class`.

---
