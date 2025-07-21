// githubService.ts
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

// Carrega variáveis do .env
dotenv.config();

// Inicializa o cliente do GitHub com autenticação via token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Função para criar uma issue
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

    console.log(`✅ Issue criada: ${response.data.html_url}`);
  } catch (error: any) {
    console.error("❌ Erro ao criar issue no GitHub:", error.message);
    throw error;
  }
}
