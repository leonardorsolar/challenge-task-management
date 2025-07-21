# agente MCP simples

- Criar uma tarefa em sua aplicação;
- Publicar essa tarefa em um **agente MCP simples**;
- Esse agente, por sua vez, **envia a tarefa para um repositório no GitHub como uma issue**.

Agente cliente MCP: é quem envia mensagens (neste caso, simulamos com mockMessage) dizendo o que deve ser feito. Aqui, é o código que cria uma tarefa e envia para ser processada.

Agente MCP (ou "servidor de mensagem" nesse fluxo simples): é quem recebe a mensagem e executa a ação (aqui, cria uma issue no GitHub).

Tudo em **Node.js + TypeScript**, sem complicações.

---

## ✅ **Objetivo final**

Você cria uma tarefa no sistema → agente recebe mensagem no formato MCP → cria uma _issue_ no GitHub.

---

## 🔧 1. MCP: Estrutura da Mensagem

```json
{
  "command": "CREATE_TASK",
  "payload": {
    "title": "Criar CRUD de tarefas",
    "description": "Deve conter prioridade, status e deadline"
  },
  "timestamp": "2025-07-20T18:00:00Z",
  "source": "task-manager"
}
```

---

## 📁 Estrutura do Projeto

```
/mcp-agent/
├── src/
│   ├── index.ts            # Inicializa o agente
│   ├── mcpAgent.ts         # Lógica para processar a mensagem
│   ├── githubService.ts    # Cria issue no GitHub
│   └── types.ts            # Tipagem das mensagens MCP
├── .env                    # Tokens do GitHub
├── tsconfig.json
```

---

## 📦 2. Dependências

```bash
npm init -y
npm install axios dotenv
npm install -D typescript @types/node ts-node
```

Crie o `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

## 🔑 `.env`

```env
GITHUB_TOKEN=ghp_sua_token_aqui
GITHUB_REPO=usuario/repositorio
```

---

## 🧾 `types.ts`

```ts
export interface MCPMessage<T = any> {
  command: string;
  payload: T;
  timestamp: string;
  source: string;
}

export interface TaskPayload {
  title: string;
  description: string;
}
```

---

## 🧠 `mcpAgent.ts`

```ts
import { MCPMessage, TaskPayload } from "./types";
import { createGithubIssue } from "./githubService";

export async function processMCPMessage(message: MCPMessage<TaskPayload>) {
  if (message.command === "CREATE_TASK") {
    const { title, description } = message.payload;
    await createGithubIssue(title, description);
    console.log(`✅ Issue criada no GitHub: ${title}`);
  } else {
    console.log(`⚠️ Comando não reconhecido: ${message.command}`);
  }
}
```

---

## 🐙 `githubService.ts`

```ts
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO; // formato: usuario/repositorio

export async function createGithubIssue(title: string, body: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/issues`;

  const res = await axios.post(
    url,
    {
      title,
      body,
    },
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  return res.data;
}
```

---

## 🚀 `index.ts` — Simulando envio

```ts
import { processMCPMessage } from "./mcpAgent";
import { MCPMessage, TaskPayload } from "./types";

const mockMessage: MCPMessage<TaskPayload> = {
  command: "CREATE_TASK",
  payload: {
    title: "Criar CRUD de tarefas",
    description: "Deve conter prioridade, status e deadline",
  },
  timestamp: new Date().toISOString(),
  source: "task-manager",
};

processMCPMessage(mockMessage).catch(console.error);
```

---

## ▶️ Executar

```bash
npx ts-node src/index.ts
```

---

## ✅ Resultado Esperado

- Uma nova **issue no GitHub** será criada com o título e descrição.
- Log de sucesso no terminal.

---

## 🔄 Quer automatizar mais?

Você pode depois:

- Substituir o mock por uma fila RabbitMQ ou Webhook;
- Adicionar o campo `assignedTo` e marcar pessoas no GitHub;
- Adicionar labels automáticas.

---
