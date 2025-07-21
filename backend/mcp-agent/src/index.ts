import { processMCPMessage } from "./mcpAgent"; // Importa o agente que vai processar a mensagem recebida
import { MCPMessage, TaskPayload } from "./types"; // Tipos de dados usados na mensagem
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4500;

//Access to XMLHttpRequest at 'http://localhost:4500/issue' from origin 'http://localhost:5173' has been blocked by CORS policy...

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("MCP Jumpad online!!!");
});

app.post("/issue", async (req, res) => {
  const message: MCPMessage<TaskPayload> = req.body;

  console.log(message);

  try {
    await processMCPMessage(message);
    res.status(200).json({ status: "ok", message: "MCP processado com sucesso" });
  } catch (error) {
    console.error("Erro no MCP:", error);
    res.status(500).json({ status: "error", message: "Falha ao processar MCP" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ MCP Agente rodando em http://localhost:${PORT}`);
});

// // Simula uma mensagem no formato MCP, com o comando "CREATE_TASK"
// const mockMessage: MCPMessage<TaskPayload> = {
//   command: "CREATE_TASK", // Diz ao agente o que deve ser feito
//   payload: {
//     title: "Criar CRUD de tarefas", // Título da tarefa
//     description: "Deve conter prioridade, status e deadline", // Descrição da tarefa
//   },
//   timestamp: new Date().toISOString(), // Hora em que a mensagem foi gerada
//   source: "task-manager", // De onde está vindo a mensagem (quem está pedindo)
// };

// // Envia a mensagem para o agente processar
// processMCPMessage(mockMessage).catch(console.error);

//o papel do agente cliente usando o protocolo MCP (Message Command Protocol). O foco aqui é simples: quando uma tarefa é criada, ela é enviada como mensagem para um agente, que então cria uma issue no GitHub.
