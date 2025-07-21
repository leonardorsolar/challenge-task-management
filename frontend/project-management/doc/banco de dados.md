Funcão handleAddTask:

// salva a task
const response = await api.post('/task', payload);
addTask(createdTask);

// Cria uma issue no GitHub relacionada
await createGithubIssue(createdTask);

// salva a mensagem da ia
const aiResponseData = await callAISuggestion(payload, createdTask.id, createdTask.userId);
setSelectedTaskForAI({
...createdTask,
title: createdTask.title,
aiSuggestion: {
reasoning: aiResponseData.\_value.aiResponse,
generatedAt: new Date().toISOString()
}

        });

---

criacao da tabela: node principal
export const createTableScripts = [
`
CREATE TABLE IF NOT EXISTS users (
id TEXT PRIMARY KEY,
email TEXT UNIQUE NOT NULL,
name TEXT NOT NULL,
password TEXT NOT NULL,
created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`,
`
CREATE TABLE IF NOT EXISTS tasks (
id TEXT PRIMARY KEY,
title TEXT NOT NULL,
description TEXT,
status TEXT CHECK (status IN ('pending', 'in_progress', 'completed')) NOT NULL DEFAULT 'pending',
priority TEXT CHECK (priority IN ('low', 'medium', 'high')) NOT NULL DEFAULT 'medium',
due_date TEXT,
user_id TEXT,
created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
`,
];

criacao da tabela: node ia
export const createTableScripts = [
`
CREATE TABLE IF NOT EXISTS messages (
id TEXT PRIMARY KEY, -- UUID como string gerado pela aplicação
user_id TEXT,
content TEXT NOT NULL,
llm_model TEXT,
generateAIResponse TEXT NOT NULL,
created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`,
];

criando a mensagem em handleAddTask (front)
{
"id": "7d02ae7d-3ca5-43f6-9ebe-1e71296499a2",
"title": "listar as tarefas new",
"description": "Com a atarefa já criada preciso listar as tarefas no front e no backend",
"status": "pending",
"priority": "medium",
"dueDate": null,
"userId": "ext-123456",
"created_at": "2025-07-21T19:53:23.960Z",
"updated_at": "2025-07-21T19:53:23.960Z"
}

callAISuggestion - Resposta da IA
{
"isSuccess": true,
"isFailure": false,
"error": null,
"\_value": {
"userMessage": {
"id": "7d02ae7d-3ca5-43f6-9ebe-1e71296499a2",
"userId": "ext-123456",
"content": "{\n \"name\": \"Sistema de gerenciamento de tarefas\",\n \"objective\": \"Desenvolver uma aplicação interna de gestão de tarefas para auxiliar no acompanhamento de demandas. O sistema deve permitir o registro, edição, listagem e filtragem de tarefas, além de fornecer uma interface web para interação com os usuários.\",\n \"type\": \"fullstack\",\n \"programmingLanguage\": \"TypeScript\",\n \"architecture\": \"Clean Architecture\",\n \"frontendFramework\": \"React\",\n \"backendFramework\": \"Express.js\",\n \"database\": \"SQLite\"\n}",
"llmModel": "gpt-3.5-turbo",
"createdAt": "2025-07-21T19:53:24.164Z"
},
"aiResponse": "`json\n{\n  \"tasks\": {\n    \"frontend\": [\n      \"Criar a estrutura de pastas do frontend\",\n      \"Implementar a interface de registro de tarefas\",\n      \"Implementar a interface de edição de tarefas\",\n      \"Implementar a interface de listagem de tarefas\",\n      \"Implementar a funcionalidade de filtragem de tarefas\"\n    ],\n    \"backend\": [\n      \"Criar a estrutura de pastas do backend seguindo Clean Architecture\",\n      \"Implementar os controllers para registro, edição, listagem e filtragem de tarefas\",\n      \"Configurar a conexão com o banco de dados SQLite\",\n      \"Definir e implementar os modelos de dados para as tarefas\",\n      \"Implementar as rotas para interação com as tarefas\"\n    ]\n  },\n  \"folderStructure\": {\n    \"backend\": {\n      \"src\": {\n        \"controllers\": \"controllers/\",\n        \"models\": \"models/\",\n        \"routes\": \"routes/\"\n      },\n      \"database\": \"database/\",\n      \"config\": \"config/\"\n    },\n    \"frontend\": {\n      \"src\": {\n        \"components\": \"components/\",\n        \"pages\": \"pages/\",\n        \"services\": \"services/\"\n      },\n      \"assets\": \"assets/\",\n      \"config\": \"config/\"\n    }\n  },\n  \"userJourney\": [\n    \"Acessar a página de registro de tarefas\",\n    \"Preencher os detalhes da nova tarefa e salvar\",\n    \"Visualizar a lista de tarefas cadastradas\",\n    \"Editar uma tarefa existente\",\n    \"Filtrar as tarefas com base em critérios específicos\"\n  ]\n}\n`"
}
}
