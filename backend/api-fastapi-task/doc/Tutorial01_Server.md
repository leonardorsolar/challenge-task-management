## 🧪 Tutorial: Criando sua Primeira API com FastAPI e CORS

### ✅ O que você vai aprender

-   Criar um servidor FastAPI
-   Entender o que é CORS e por que configurá-lo
-   Testar uma rota básica no navegador ou no Insomnia/Postman

---

### 🛠️ Pré-requisitos

Antes de começar, você precisa ter o Python instalado. Para verificar:

```bash
python --version
```

Recomendo usar um ambiente virtual:

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

Instale as dependências:

```bash
pip install fastapi uvicorn
pip install "python-multipart"  # opcional para uploads
pip install aiofiles            # opcional para uploads
pip install requests            # se quiser fazer chamadas HTTP
pip install httpx               # alternativa moderna ao requests
pip install uvicorn[standard]   # inclui recarregamento automático
```

---

## ✅ Estrutura Recomendada (inspirada em DDD e Clean Architecture)

```
meu_projeto/
├── main.py
└── src/
    └── shared/
        └── infrastructure/
            └── http/
                └── app.py  ← onde a FastAPI é configurada
```

---

## 📄 `main.py` (ponto de entrada)

```python
from src.shared.infrastructure.http.app import app

# Este arquivo apenas importa e expõe o `app`
```

---

## 📄 `src/shared/infrastructure/http/app.py` (servidor FastAPI)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API está no ar! Acesse /users para endpoints de usuários."}
```

---

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Criação da aplicação FastAPI
app = FastAPI()

# Lista de origens permitidas (ex: seu frontend em React ou outro)
origins = [
    "http://localhost:5173",  # endereço padrão do Vite (React)
    "http://localhost:3000",  # endereço padrão do Create React App
]

# Adicionando o middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # permite essas origens específicas
    allow_credentials=True,
    allow_methods=["*"],             # permite todos os métodos HTTP (GET, POST, etc)
    allow_headers=["*"],             # permite todos os headers
)

# Rota de teste
@app.get("/")
def root():
    return {"message": "API está no ar! Acesse /users para endpoints de usuários."}
```

---

### ▶️ Rodando o servidor

No terminal, execute:

```bash
uvicorn main:app --reload
```

📌 O `main:app` indica:

-   `main` = nome do arquivo (`main.py`)
-   `app` = variável que está sendo importada e exposta de `app.py`

Se tudo der certo, você verá algo como:

```
Uvicorn running on http://127.0.0.1:8000
```

Acesse no navegador ou via `curl`:

-   [http://127.0.0.1:8000](http://127.0.0.1:8000)
-   Documentação automática: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## ✅ Vantagens dessa abordagem

-   **Organização clara** por responsabilidades (infraestrutura, domínio, aplicação, etc)
-   Facilita **testes unitários e integração**
-   Permite escalar o projeto facilmente (ex: múltiplos serviços HTTP, CLI, workers, etc)
-   Está alinhado com os princípios de **Clean Architecture** e **DDD**

---

### ❓ O que é CORS?

**CORS (Cross-Origin Resource Sharing)** é uma política de segurança dos navegadores. Ele bloqueia requisições vindas de domínios diferentes se o backend não permitir explicitamente.

➡️ Por isso usamos `CORSMiddleware`, para dizer que o backend **confia no frontend**.

---

### ✅ Próximos passos:

Você pode:

-   Criar mais rotas (`@app.post`, `@app.put`, etc)
-   Adicionar persistência com banco de dados
-   Separar em pastas `routers/`, `models/`, `services/` (arquitetura limpa)
-   Conectar com um frontend feito em React, Vue ou outro
