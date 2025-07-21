import { ILLMService, ILLMRequest, ILLMResponse } from "../../domain/services/ILLMService";
import { IAISuggestion } from "../../domain/entities/LLMResponse";

import { right } from "../../../../shared/core/Either";
import { Result } from "../../../../shared/core/Result";

export class OpenAIService implements ILLMService {
  private readonly apiKey: string;
  private readonly baseURL: string = "https://api.openai.com/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(request: ILLMRequest): Promise<any> {
    console.log("generateResponse");
    try {
      const systemPrompt = `
      Você é um assistente de produtividade que analisa tarefas enviadas por engenheiros de software e fornece sugestões estruturadas com base em princípios de engenharia de software.

      ---

      **Sua Tarefa (como IA de Engenharia de Software)**

      Com base nos dados do projeto fornecido, gere os seguintes **outputs técnicos**:

      1. **Tarefas técnicas detalhadas**  
      Quebre a funcionalidade de criação de tarefas em tarefas menores para:
      - Frontend
      - Backend

      Organize como uma checklist para devs.

      2. **Estrutura de pastas e arquivos sugerida**  
      Baseando-se na arquitetura *Clean Architecture*, gere:
      - Estrutura de pastas do **backend**
      - Estrutura de pastas do **frontend**

      Inclua os nomes dos arquivos relevantes.

      3. **Jornada do usuário (UX)**  
      Liste as etapas da jornada do usuário usando **verbo + substantivo**, de forma objetiva.

      Responda em formato JSON válido.
      `;

      const finalPrompt = `
      Este é o contexto de um projeto de software enviado por um engenheiro:

      \`\`\`json
      ${typeof request.content === "object" ? JSON.stringify(request.content, null, 2) : request.content}
      \`\`\`

      Siga as instruções abaixo para analisar esse contexto e fornecer sugestões estruturadas.
      `.trim();

      console.log(systemPrompt);

      console.log(request);
      console.log("chamada ia");
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: request.model || "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: finalPrompt },
          ],
          max_tokens: request.maxTokens || 1000,
          temperature: request.temperature || 0.7,
        }),
      });

      //console.log(response);

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const content = data.choices[0]?.message?.content || "";

      console.log("content");
      console.log(content);

      // Tentar extrair sugestão de IA do conteúdo
      let aiSuggestion: IAISuggestion | undefined;
      if (content.trim().startsWith("{")) {
        aiSuggestion = JSON.parse(content);
      }

      return right(
        Result.ok<any>({
          content,
          model: request.model || "gpt-3.5-turbo",
          aiSuggestion,
          metadata: {
            usage: data.usage,
            finishReason: data.choices[0]?.finish_reason,
          },
        })
      );
    } catch (error) {
      throw new Error(`Erro ao comunicar com OpenAI: ${error}`);
    }
  }
}
