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
    try {
      const systemPrompt =
        request.systemPrompt ||
        `
        Você é um assistente de produtividade que analisa tarefas e fornece sugestões estruturadas.
        Para cada tarefa, analise e forneça:
        - Descrição detalhada sugerida
        - Prioridade (low, medium, high)
        - Status inicial (pending, in-progress, completed)
        - Data de vencimento sugerida
        - Reasoning com explicação e sugestões adicionais
        
        Responda em formato JSON válido.
      `;

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
            { role: "user", content: request.content },
          ],
          max_tokens: request.maxTokens || 1000,
          temperature: request.temperature || 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || "";

      // Tentar extrair sugestão de IA do conteúdo
      let aiSuggestion: IAISuggestion | undefined;
      try {
        // Se o conteúdo for JSON, tenta fazer parse
        if (content.trim().startsWith("{")) {
          aiSuggestion = JSON.parse(content);
        } else {
          // Caso contrário, usa um mock baseado no conteúdo
          aiSuggestion = this.generateMockSuggestion(request.content);
        }
      } catch {
        aiSuggestion = this.generateMockSuggestion(request.content);
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

  private generateMockSuggestion(content: string): IAISuggestion {
    return {
      suggestedDescription: `Análise detalhada da tarefa: ${content}. Implementação de sistema com funcionalidades CRUD completas.`,
      suggestedPriority: "high",
      suggestedStatus: "pending",
      suggestedDueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      reasoning: `Com base no conteúdo "${content}", a IA sugere:
- **Priorização alta**: Tarefa envolve aspectos fundamentais do sistema
- **Status inicial**: Pendente para permitir planejamento adequado
- **Prazo sugerido**: 3 dias para execução eficiente
- **Próximos passos**: Definir subtarefas, modelagem de dados, e implementação de API`,
    };
  }
}
