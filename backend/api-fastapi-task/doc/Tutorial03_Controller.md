Perfeito! Abaixo está um **tutorial completo e direto** sobre como criar um controller separado no **FastAPI**, exatamente no estilo que você está usando — com uma explicação clara sobre **por que essa separação é importante**, seguindo boas práticas de arquitetura.

---

# ✅ Tutorial: Criando um Controller Separado no FastAPI

---

## 🎯 Objetivo

Separar a lógica de negócio (controller) da camada de rotas para manter o código:

-   organizado,
-   testável,
-   reutilizável,
-   desacoplado do framework.

---

## 📁 Estrutura de Arquivos

```
app/
├── shared/
│   └── infrastructure/
│       └── http/
│           └── api/
│               └── v1.py
├── modules/
│   └── task/
│       └── presentation/
│           ├── controllers/
│           │   └── create_task_controller.py ✅
│           └── routes/
│               └── task_routes.py ✅
```

---

## 1️⃣ Criar o Controller

### 📄 `create_task_controller.py`

```python
# app/modules/task/presentation/controllers/create_task_controller.py

def handle():
    print("[CreateTaskController] Criando tarefa...")
    return {"message": "Tarefa criada com sucesso"}
```

> 🔹 Essa função `handle()` é responsável por processar a criação da tarefa. Aqui, podemos validar dados, chamar serviços, ou casos de uso (use cases) — tudo separado da rota.

---

## 2️⃣ Usar o Controller na Rota

### 📄 `task_routes.py`

```python
# app/modules/task/presentation/routes/task_routes.py

from fastapi import APIRouter
from app.modules.task.presentation.controllers import create_task_controller  # ✅ Importação

router = APIRouter()

@router.get("/")
def list_tasks():
    return [{"id": 1, "title": "Tarefa 1"}]

@router.post("/")
def create_task():
    return create_task_controller.handle()
```

> 🔹 A rota apenas **chama o controller**, que por sua vez cuida da lógica. Isso segue o princípio da **separação de responsabilidades (SRP - Single Responsibility Principle)** do SOLID.

---

## 3️⃣ Registrar as Rotas na API Principal

### 📄 `v1.py`

```python
# app/shared/infrastructure/http/api/v1.py

from fastapi import APIRouter
from app.modules.task.presentation.routes.task_routes import router as task_router

api_v1_router = APIRouter()

@api_v1_router.get("/")
def root():
    return {"message": "API v1"}

api_v1_router.include_router(task_router, prefix="/task", tags=["Task"])
```

---

## ✅ Resultado Final

Ao acessar `POST http://localhost:8000/api/v1/task`, a rota chamará o controller, que imprimirá no terminal:

```bash
[CreateTaskController] Criando tarefa...
```

E responderá:

```json
{ "message": "Tarefa criada com sucesso" }
```

---

## 🧠 Por que separar controller da rota?

| Vantagem          | Explicação                                                                        |
| ----------------- | --------------------------------------------------------------------------------- |
| ✅ Organização    | Cada responsabilidade em um lugar: rota lida com o HTTP, controller com a lógica. |
| ✅ Reutilização   | O controller pode ser chamado por outros pontos, como testes ou outros endpoints. |
| ✅ Testabilidade  | Testar o controller sem precisar subir a API. Fácil de mockar.                    |
| ✅ Manutenção     | Mais fácil de entender, debugar e evoluir.                                        |
| ✅ Escalabilidade | Fácil aplicar princípios de DDD, Clean Architecture e SOLID.                      |

---

## 📌 Dica para escalar

Você pode futuramente expandir essa separação assim:

-   `controllers/` → tratam a entrada e resposta HTTP
-   `usecases/` → lógica de negócio (aplicação)
-   `services/` → regras específicas reutilizáveis
-   `repositories/` → acesso ao banco de dados

---
