Perfeito! Vamos construir um **tutorial completo e didático** explicando **como e por que criar um arquivo de rotas `api/v1.py`**, com **organização profissional** do seu projeto em FastAPI. Isso segue boas práticas inspiradas em frameworks como Express.js, NestJS, Spring Boot, etc.

---

# 🧪 Tutorial: Criando e Usando Routers Modulares com FastAPI (`api/v1.py`)

## 🎯 Objetivo

Organizar suas rotas em arquivos separados e centralizá-las em um ponto comum (`api/v1.py`), facilitando manutenção, crescimento e separação por módulo.

---

## 📁 Estrutura de Pastas Sugerida

```
app/
├── main.py  ← ponto de entrada (importa app.py)
├── shared/
│   └── infrastructure/
│       └── http/
│           ├── app.py       ← cria e configura o app
│           └── api/
│               └── v1.py    ← registra as rotas da versão v1 da API
└── modules/
    └── task/
        └── presentation/
            └── routes/
                └── task.routes.py ← rotas do módulo task
```

---

## 🛠️ 1. Arquivo `app/shared/infrastructure/http/app.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.shared.infrastructure.http.api.v1 import api_v1_router

app = FastAPI()

# CORS - Liberação de acesso para o frontend
origins = [
    "http://localhost:5173",  # Vite
    "http://localhost:3000",  # React CRA
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rota raiz
@app.get("/")
def root():
    return {"message": "API está no ar! Acesse /api/v1 para acessar as rotas e os endpoints."}

# Montar a versão da API
app.include_router(api_v1_router, prefix="/api/v1")
```

---

## 🛠️ 2. Arquivo `app/shared/infrastructure/http/api/v1.py`

```python
from fastapi import APIRouter
from app.modules.task.presentation.routes.task_routes import router as task_router

api_v1_router = APIRouter()

# Rota da raiz da versão
@api_v1_router.get("/")
def root():
    return {"message": "API v1"}

# Registro das rotas do módulo task com o prefixo /task
api_v1_router.include_router(task_router, prefix="/task", tags=["Task"])
```

---

## 🛠️ 3. Arquivo `app/modules/task/presentation/routes/task_routes.py`

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_tasks():
    return [{"id": 1, "title": "Tarefa 1"}]

@router.post("/")
def create_task():
    return {"message": "Tarefa criada com sucesso"}
```

---

## 🛠️ 4. Arquivo `main.py`

```python
from app.shared.infrastructure.http.app import app
```

E rode com:

```bash
uvicorn main:app --reload
```

---

Acesse o navegador:

-   http://127.0.0.1:8000

-   http://127.0.0.1:8000/api/v1/

-   http://127.0.0.1:8000/api/v1/task

-   Documentação automática: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## ✅ O que essa estrutura ajuda?

| Vantagem                 | Descrição                                                               |
| ------------------------ | ----------------------------------------------------------------------- |
| 🔌 **Modularidade**      | Cada funcionalidade (task, user, auth) tem seu próprio arquivo de rotas |
| 🚀 **Escalabilidade**    | Fácil criar `v2.py` futuramente para versão 2 da API                    |
| 🧪 **Testabilidade**     | Rotas e módulos podem ser testados separadamente                        |
| 🔍 **Organização limpa** | Ideal para times e projetos profissionais                               |
| 📦 **Reaproveitamento**  | Você pode reutilizar routers, middlewares, dependências facilmente      |

---

## 📍 Exemplo de uso

| Método | Endpoint        | Descrição                    |
| ------ | --------------- | ---------------------------- |
| `GET`  | `/`             | Verifica se a API está no ar |
| `GET`  | `/api/v1/`      | Mensagem da versão 1 da API  |
| `GET`  | `/api/v1/task/` | Lista de tarefas             |
| `POST` | `/api/v1/task/` | Criação de nova tarefa       |

---

## 💡 Quer ir além?

Podemos adicionar:

-   Middleware global de autenticação
-   Validações com `Pydantic`
-   Camadas de **casos de uso** (`usecases`) e **repositórios**
-   Documentação da API com exemplos reais
