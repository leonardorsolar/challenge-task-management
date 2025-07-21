**projeto completo e didático em Node.js com TypeScript**, simulando a criação de uma tarefa usando o protocolo **MCP (Message Command Protocol)** que envia uma **issue para o GitHub** ao criar uma nova tarefa.

---

## 📦 Estrutura do Projeto

```
mcp-task-agent/
│
├── src/
│   ├── index.ts              # Inicia o envio da tarefa simulada
│   ├── mcpAgent.ts           # Agente MCP que processa comandos
│   ├── githubService.ts      # Comunicação com GitHub
│   ├── types.ts              # Tipagens para MCP
│
├── .env                      # Variáveis de ambiente (token GitHub etc.)
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🧱 Passo a passo para montar

---

### 1. 📁 Crie o projeto e instale as dependências:

```bash
mkdir mcp-task-agent && cd mcp-task-agent
npm init -y

npm install @octokit/rest dotenv
npm install -D typescript ts-node @types/node
```

---

### 2. ⚙️ Crie o `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

### 3. 📄 Crie `.env`

```
GITHUB_TOKEN=ghp_seuTokenAqui
GITHUB_OWNER=seuUsuarioOuOrg
GITHUB_REPO=nomeDoRepositorio
```

---

### 4. 📄 Crie `src/types.ts`

```ts
export interface MCPMessage<T> {
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

### 5. 📄 Crie `src/githubService.ts`

```ts
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

// Inicializa o cliente GitHub com token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function createGithubIssue(title: string, body: string) {
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;

  try {
    const response = await octokit.issues.create({
      owner,
      repo,
      title,
      body,
    });

    console.log(`✅ Issue criada no GitHub: ${response.data.html_url}`);
  } catch (error: any) {
    console.error("❌ Erro ao criar issue:", error.message);
    throw error;
  }
}
```

---

### 6. 📄 Crie `src/mcpAgent.ts`

```ts
// Simula um agente que entende comandos MCP
import { MCPMessage, TaskPayload } from "./types";
import { createGithubIssue } from "./githubService";

export async function processMCPMessage(message: MCPMessage<TaskPayload>) {
  if (message.command === "CREATE_TASK") {
    const { title, description } = message.payload;

    // Chama o serviço para criar issue no GitHub
    await createGithubIssue(title, description);
  } else {
    console.log(`⚠️ Comando desconhecido: ${message.command}`);
  }
}
```

---

### 7. 📄 Crie `src/index.ts`

```ts
import { processMCPMessage } from "./mcpAgent";
import { MCPMessage, TaskPayload } from "./types";

// Simula o envio de uma tarefa via protocolo MCP
const mockMessage: MCPMessage<TaskPayload> = {
  command: "CREATE_TASK",
  payload: {
    title: "Implementar sistema de login",
    description: "O sistema deve ter autenticação por email e senha",
  },
  timestamp: new Date().toISOString(),
  source: "task-manager",
};

// Inicia o processo
processMCPMessage(mockMessage).catch(console.error);
```

---

### 8. 📄 Crie `.gitignore`

```
node_modules/
.env
dist/
```

---

### 9. 🏁 Execute o projeto

```bash
npx ts-node src/index.ts
```

Você verá no terminal:

```bash
✅ Issue criada no GitHub: https://github.com/seuUsuarioOuOrg/repositorio/issues/123
```

---

## ✅ Pronto!

Você agora tem:

- Um **agente MCP** simples em Node.js.
- Um **serviço de integração com GitHub**.
- Um **simulador de tarefa** (como se fosse vindo de um sistema externo).

---

Se quiser, posso ajudar a expandir isso com:

- Envio automático por evento de criação real de tarefa.
- Um cliente web que envia MCP.
- E-mail de confirmação via Nodemailer.

### ✅ Verificações e Correções

---

### 1. **Verifique o payload que está sendo enviado ao agente**

No seu terminal foi exibido:

```json
{
  "title": "Criar teste issue new",
  "description": "dewsc Criar teste issue new"
}
```

Esse JSON **não possui a estrutura correta esperada pela tipagem `MCPMessage<TaskPayload>`**, que deve ter o campo `command`.

---

### 2. ✅ Estrutura correta da mensagem MCP

Seu agente espera que a mensagem tenha o formato:

```ts
interface MCPMessage<T> {
  command: string;
  payload: T;
}
```

Logo, o JSON que **deve ser enviado** ao MCP Agent via POST é:

```json
{
  "command": "CREATE_TASK",
  "payload": {
    "title": "Criar teste issue new",
    "description": "dewsc Criar teste issue new"
  }
}
```

---

### 3. ✅ Como testar com `curl` ou Postman

Se quiser testar direto no terminal com `curl`:

```bash
curl -X POST http://localhost:4500/issue \
  -H "Content-Type: application/json" \
  -d '{
    "command": "CREATE_TASK",
    "payload": {
      "title": "Criar teste issue new",
      "description": "dewsc Criar teste issue new"
    }
  }'
```

---

### 4. ✅ Se estiver chamando do frontend (por ex. React)

```ts
await fetch("http://localhost:4500/issue", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    command: "CREATE_TASK",
    payload: {
      title: "Criar teste issue new",
      description: "dewsc Criar teste issue new",
    },
  }),
});
```

---

### 5. ✅ Dica: Valide os campos antes de processar

No seu agente, adicione uma verificação simples para evitar `undefined`:

```ts
if (!message.command || !message.payload) {
  console.warn("⚠️ Mensagem malformada:", message);
  return;
}
```
