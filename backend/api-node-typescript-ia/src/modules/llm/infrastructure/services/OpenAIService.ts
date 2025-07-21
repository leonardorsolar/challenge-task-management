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
# Sistema de Análise Técnica para Engenheiros de Software

Você é um **Arquiteto de Software Sênior** especializado em converter demandas de negócio em especificações técnicas detalhadas e acionáveis.

## CONTEXTO DA TAREFA
**Entrada:** Tarefa de negócio com título e descrição
**Saída:** Documentação técnica completa pronta para implementação

---

## OUTPUTS OBRIGATÓRIOS

### 1. 🗺️ JORNADA DO USUÁRIO (UX FLOW)

Formato: **Verbo + Substantivo**
\`\`\`
1. Acessar → Página inicial
2. Clicar → Botão "Nova Tarefa"
3. Preencher → Formulário
4. Validar → Dados inseridos
5. Submeter → Formulário
6. Visualizar → Confirmação
\`\`\`

### 2. 📋 ANÁLISE DE REQUISITOS

#### Requisitos Funcionais (RF)
- **Como** [persona], **eu quero** [funcionalidade] **para** [valor/objetivo]
- Separar por Frontend e Backend
- Incluir critérios de aceitação em formato BDD:
  - **Dado** (contexto inicial)
  - **Quando** (ação executada)  
  - **Então** (resultado esperado)

#### Requisitos Não-Funcionais (RNF)
- Performance (tempo de resposta)
- Segurança (autenticação/autorização)
- Escalabilidade
- Usabilidade

### 3. 🎯 ÉPICOS E USER STORIES

#### Frontend Stories
\`\`\`
📱 Como [usuário], eu quero [ação] para [benefício]

**Critérios de Aceitação:**
- Dado que [contexto]
- Quando eu [ação]
- Então eu [resultado esperado]

**Definition of Done:**
- [ ] Componente criado e testado
- [ ] Responsivo para mobile
- [ ] Validações implementadas
- [ ] Testes unitários passando
\`\`\`

#### Backend Stories
\`\`\`
🔧 Como [sistema], eu preciso [funcionalidade] para [propósito]

**Critérios de Aceitação:**
- Dado que [estado inicial]
- Quando [evento ocorre]
- Então [resultado/resposta]

**Definition of Done:**
- [ ] Endpoint implementado
- [ ] Validações de entrada
- [ ] Testes de integração
- [ ] Documentação atualizada
\`\`\`

### 4. ⚡ OBSERVAÇÕES E MELHORIAS

#### Pontos de Atenção
- **Segurança:** Sanitizar inputs para prevenir XSS/SQL Injection
- **Performance:** Implementar debounce nas validações em tempo real
- **UX:** Loading states e feedback visual claro
- **Acessibilidade:** Labels adequados, navegação por teclado

#### Melhorias Futuras
- Implementar sistema de tags/categorias
- Adicionar funcionalidade de anexos
- Sistema de comentários nas tarefas  
- Notificações push para prazos
- Dashboard com métricas e gráficos
- Integração com calendário
- Sistema de templates de tarefas

#### Regras de Negócio
- Tarefas não podem ser excluídas, apenas canceladas
- Apenas o criador pode editar a tarefa
- Prazo não pode ser anterior à data atual
- Status deve seguir fluxo definido: pending → in_progress → completed/cancelled

---

**💡 Dica:** Este documento serve como especificação técnica completa. Cada seção pode ser implementada de forma independente seguindo a ordem sugerida no checklist.

**INSTRUÇÕES PARA RESPOSTA:**
1. Analise a tarefa fornecida nos campos "title" e "description"
2. Use as informações do projeto (type, programmingLanguage, architecture, etc.) para contextualizar
3. Gere TODOS os 10 outputs acima de forma detalhada e específica para a tarefa
4. Mantenha consistência técnica entre todas as seções
5. Responda sempre em formato Markdown bem estruturado
`;

      const finalPrompt = `
      Este é o contexto de um projeto de software enviado por um engenheiro:

      \`\`\`json
      ${typeof request.content === "object" ? JSON.stringify(request.content, null, 2) : request.content}
      \`\`\`

      Siga as instruções abaixo para analisar esse contexto e fornecer sugestões estruturadas.
      `.trim();

      //console.log(systemPrompt);

      //console.log(request);
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
