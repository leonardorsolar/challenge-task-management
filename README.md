# 📋 Doc: Sistema de Gerenciamento de Tarefas (ToDo App)

Este projeto consiste no desenvolvimento de uma aplicação **Full Stack** com backend em API RESTful e frontend responsivo. Abaixo estão os requisitos detalhados para ambos os lados da aplicação.

---

## 🧠 BACKEND - API RESTful

### ✅ Funcionalidades

A API deve suportar as seguintes operações:

- ✅ Criar uma nova tarefa
- 📋 Listar tarefas existentes
- 🔍 Filtrar tarefas por status:

  - pendente
  - em andamento
  - concluída

- 🔄 Atualizar o status de uma tarefa
- ❌ Remover uma tarefa

### 📦 Requisitos Técnicos

- A comunicação entre frontend e backend **deve ser feita via JSON**.
- Deve haver **modelagem clara das entidades** (por exemplo: `Task`).
- Organize o código com **separação de responsabilidades**:

  - **Modelos**: definição das entidades (ex: classe `Task`)
  - **Controladores**: gerenciamento das rotas e lógica HTTP
  - **Serviços**: lógica de negócio (ex: atualizar status)
  - **Repositórios ou banco de dados**: persistência dos dados

### 📝 Documentação

- A API deve estar **documentada com um padrão de mercado**, como:

  - Swagger (OpenAPI)
  - Postman Collection
  - Redoc

---

## 💻 FRONTEND - Interface Web

### ✅ Funcionalidades

A interface deve permitir ao usuário:

- 👀 Visualizar a lista de tarefas
- 🔍 Filtrar tarefas por status
- ➕ Criar uma nova tarefa
- 🔄 Alterar o status de uma tarefa
- 🗑️ Excluir uma tarefa

### 📦 Requisitos Técnicos

- O frontend **deve consumir a API** desenvolvida.
- A interface deve ser:

  - **Responsiva** (funcionar bem em desktop e mobile)
  - **Simples e funcional**

- Mínimo de atenção à **usabilidade**:

  - Botões claros
  - Feedback visual (ex: tarefa criada, erro ao salvar)
  - Agrupamento visual por status ou ações

---

## 🚀 Dicas para Implementação

- Use frameworks/bibliotecas como:

  - **Backend**: Node.js + Express | FastAPI | Django REST
  - **Frontend**: React

- Utilize uma ferramenta de testes para a API:

  - Insomnia
  - Postman

---

## 📁 Estrutura Sugerida do Projeto

```
project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js / main.py
│   └── docs/ (Swagger ou outro)
└── frontend/
    ├── components/
    ├── pages/
    ├── services/ (consumo da API)
    └── index.html / App.js
```

---
