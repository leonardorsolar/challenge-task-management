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

#### Requisitos Funcionais (RF) Frontend
- Tipo: Requisito Funcional
- Área: Frontend  

**Descrição::**
- **Como** [persona], **eu quero** [funcionalidade] **para** [valor/objetivo]

**Critérios de Aceitação:**
  - **Dado** (contexto inicial)
  - **Quando** (ação executada)  
  - **Então** (resultado esperado)

#### Requisitos Funcionais (RF) Backend
- Tipo: Requisito Funcional
- Área: Backend  

**Descrição::**
- **Como** [persona], **eu quero** [funcionalidade] **para** [valor/objetivo]

**Critérios de Aceitação:**
  - **Dado** (contexto inicial)
  - **Quando** (ação executada)  
  - **Então** (resultado esperado)

#### Requisitos Não-Funcionais (RNF)
- Performance (ex.:tempo de resposta)
- Segurança (ex.: autenticação/autorização)
- Escalabilidade: [ex: suporte a múltiplos usuários simultâneos]
- Usabilidade: [ex: acessível em mobile, uso intuitivo]

**Definition of Done:**
- [ ] Componente criado e testado
- [ ] Responsivo para mobile
- [ ] Validações implementadas
- [ ] Testes unitários passando

### 4. 📁 ARQUITETURA DE ARQUIVOS

Exemplo de estrutura de pastas para o Tipo de Requisito Funcional
#### Frontend (React + Clean Architecture)
\`\`\`
src/
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   └── Input/
│   └── features/
│       └── tasks/
│           ├── TaskForm/
│           ├── TaskList/
│           └── TaskItem/
├── hooks/
│   └── useTasks.ts
├── services/
│   └── api/
│       └── taskService.ts
├── types/
│   └── Task.ts
└── pages/
    └── TasksPage.tsx
\`\`\`

Exemplo de estrutura de pastas para o Tipo de Requisito Funcional
#### Backend (Clean Architecture)
\`\`\`
src/
├── domain/
│   ├── entities/
│   │   └── Task.ts
│   ├── repositories/
│   │   └── ITaskRepository.ts
│   └── usecases/
│       └── CreateTaskUseCase.ts
├── infrastructure/
│   ├── database/
│   │   ├── migrations/
│   │   └── TaskRepository.ts
│   └── web/
│       ├── controllers/
│       │   └── TaskController.ts
│       ├── middlewares/
│       └── routes/
│           └── taskRoutes.ts
└── main/
    ├── config/
    ├── factories/
    └── server.ts
\`\`\`
### 5. 📦 PAYLOADS DE EXEMPLO

exemplo de payload para  o Tipo de Requisito Funcional

#### Request (POST /api/tasks)

\`\`\`json
{
    "title": "Implementar autenticação de usuários",
    "description": "Adicionar funcionalidade de login com JWT, incluindo middleware de autenticação e proteção de rotas",
    "priority": "high",
    "dueDate": "2025-08-15"
}
\`\`\`

#### Response Success (201)
\`\`\`json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "Implementar autenticação de usuários", 
        "description": "Adicionar funcionalidade de login com JWT, incluindo middleware de autenticação e proteção de rotas",
        "priority": "high",
        "status": "pending",
        "dueDate": "2025-08-15",
        "createdAt": "2025-07-21T22:30:00.000Z",
        "updatedAt": "2025-07-21T22:30:00.000Z",
        "createdBy": "user123"
    },
    "message": "Tarefa criada com sucesso"
}
\`\`\`

#### Response Error (400)
\`\`\`json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Dados inválidos fornecidos",
        "details": [
            {
                "field": "title",
                "message": "Título deve ter pelo menos 3 caracteres"
            },
            {
                "field": "description", 
                "message": "Descrição deve ter pelo menos 10 caracteres"
            }
        ]
    }
}
\`\`\`

### 7. 🔍 CHECKLIST DE IMPLEMENTAÇÃO

#### Backend

exemplo do  código da usecase para o Tipo de Requisito Funcional

### 6. 🔍 CHECKLIST DE IMPLEMENTAÇÃO

exemplo  para o Tipo de Requisito Funcional
#### Backend
- [ ] 

#### Frontend  
- [ ] 

`;

      const finalPrompt = `
      Este é o contexto de um projeto de software enviado por um engenheiro:

      \`\`\`json
      ${typeof request.content === "object" ? JSON.stringify(request.content, null, 2) : request.content}
      \`\`\`

      Siga as instruções abaixo para analisar esse contexto e fornecer sugestões estruturadas.
      `.trim();

      console.log(systemPrompt);

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
