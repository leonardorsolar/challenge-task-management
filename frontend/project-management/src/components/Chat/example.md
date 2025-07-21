import React from 'react'
import AIRequestField from './AIRequestField'

// Exemplo 1: Uso básico
const ExampleBasicUsage = ({ isDarkMode }) => {
return (
<div className="p-6">
<h2 className="text-2xl font-bold mb-4">Uso Básico</h2>
<AIRequestField 
        isDarkMode={isDarkMode}
        placeholder="Ex: Crie um diagrama de atividade para login de usuário"
        title="Solicitar à IA"
      />
</div>
)
}

// Exemplo 2: Com conteúdo de contexto (para somar com aiSuggestion.content)
const ExampleWithContext = ({ isDarkMode, aiSuggestion }) => {
const handleResponse = (response, fullData) => {
console.log('Nova resposta recebida:', response)
// Aqui você pode fazer algo com a resposta, como salvar em estado
}

return (
<div className="p-6">
<h2 className="text-2xl font-bold mb-4">Com Contexto Existente</h2>
<AIRequestField
isDarkMode={isDarkMode}
contextContent={aiSuggestion?.content || ''}
placeholder="Ex: Adicione mais detalhes ao diagrama, inclua casos de erro"
title="Expandir Sugestão da IA"
onResponse={handleResponse}
additionalData={{
          taskId: 'task-123',
          type: 'expansion'
        }}
/>
</div>
)
}

// Exemplo 3: Para documentação/relatórios
const ExampleForDocumentation = ({ isDarkMode }) => {
return (
<div className="p-6">
<h2 className="text-2xl font-bold mb-4">Gerador de Documentação</h2>
<AIRequestField 
        isDarkMode={isDarkMode}
        placeholder="Ex: Gere a documentação técnica para esta API"
        title="Gerar Documentação"
        apiEndpoint="/api/generate-documentation"
        className="max-w-4xl"
      />
</div>
)
}

// Exemplo 4: Para análise de código
const ExampleCodeAnalysis = ({ isDarkMode, codeContent }) => {
return (
<div className="p-6">
<h2 className="text-2xl font-bold mb-4">Análise de Código</h2>
<AIRequestField
isDarkMode={isDarkMode}
contextContent={codeContent}
placeholder="Ex: Analise este código e sugira melhorias de performance"
title="Analisar Código"
apiEndpoint="/api/analyze-code"
additionalData={{
          language: 'javascript',
          analysisType: 'performance'
        }}
/>
</div>
)
}

// Exemplo 5: Chat contínuo (mantém histórico)
const ExampleContinuousChat = ({ isDarkMode }) => {
const [chatHistory, setChatHistory] = React.useState('')

const handleChatResponse = (response) => {
setChatHistory(prev => `${prev}\n\n**IA:** ${response}`)
}

return (
<div className="p-6">
<h2 className="text-2xl font-bold mb-4">Chat Contínuo</h2>

      {/* Histórico do chat */}
      {chatHistory && (
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-h-60 overflow-y-auto">
          <h3 className="font-semibold mb-2">Histórico da Conversa:</h3>
          <div className="text-sm whitespace-pre-wrap">{chatHistory}</div>
        </div>
      )}

      <AIRequestField
        isDarkMode={isDarkMode}
        contextContent={chatHistory}
        placeholder="Continue a conversa..."
        title="Chat com IA"
        apiEndpoint="/api/chat"
        onResponse={handleChatResponse}
      />
    </div>

)
}

// Exemplo 6: Integração com seu modal existente
const ExampleModalIntegration = ({ isDarkMode, task, aiSuggestion }) => {
return (
<div className="p-6">
<h2 className="text-2xl font-bold mb-4">Integração com Modal Existente</h2>
<p className="mb-4 text-gray-600">
Este componente pode ser inserido no final do seu AISuggestionModal:
</p>

      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
        <AIRequestField
          isDarkMode={isDarkMode}
          contextContent={aiSuggestion?.content || ''}
          placeholder="Ex: Crie um diagrama de atividade baseado nesta sugestão"
          title="Solicitar Complemento"
          apiEndpoint="/api/ai-suggestion"
          additionalData={{
            taskId: task?.id,
            originalSuggestion: aiSuggestion
          }}
          className="max-w-none"
        />
      </div>
    </div>

)
}

// Exemplo de como inserir no final do seu AISuggestionModal
const IntegrateInExistingModal = `
// No final do seu AISuggestionModal, antes do Footer, adicione:

{/_ Campo de Nova Solicitação _/}
<AIRequestField
isDarkMode={isDarkMode}
contextContent={aiSuggestion?.content || ''}
placeholder="Ex: Crie um diagrama de atividade, detalhe este processo"
title="Fazer Nova Solicitação"
apiEndpoint="/api/ai-suggestion"
additionalData={{
    taskId: task?.id,
    originalSuggestion: aiSuggestion
  }}
/>
`

export {
ExampleBasicUsage,
ExampleWithContext,
ExampleForDocumentation,
ExampleCodeAnalysis,
ExampleContinuousChat,
ExampleModalIntegration,
IntegrateInExistingModal
}
