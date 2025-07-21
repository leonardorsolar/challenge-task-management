import { MCPMessage, TaskPayload } from "./types"; // Tipos usados na estrutura da mensagem
import { createGithubIssue } from "./githubService"; // Função que cria uma issue no GitHub

// Essa função representa o "agente" que processa as mensagens MCP
export async function processMCPMessage(message: MCPMessage<TaskPayload>) {
  // Verifica qual é o comando da mensagem

  console.log("processMCPMessage");
  console.log(message);

  if (message.command === "CREATE_TASK") {
    // Extrai os dados da tarefa
    const { title, description } = message.payload;

    // Cria uma issue no GitHub com esses dados
    await createGithubIssue(title, description);

    // Mostra no console que deu tudo certo
    console.log(`✅ Issue criada no GitHub: ${title}`);
  } else {
    // Caso receba um comando desconhecido, exibe aviso
    console.log(`⚠️ Comando não reconhecido: ${message.command}`);
  }
}
