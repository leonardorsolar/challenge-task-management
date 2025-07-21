import React, { useState } from 'react'
import { Send, Loader2, Sparkles, MessageSquare, AlertCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const AIRequestField = ({ 
  isDarkMode = false,
  contextContent = '', // Conteúdo que será somado com a solicitação
  placeholder = "Digite sua solicitação para a IA...",
  title = "Solicitar à IA",
  apiEndpoint = '/api/ai-suggestion',
  onResponse = null, // Callback opcional para quando receber resposta
  additionalData = {}, // Dados adicionais para enviar ao backend
  className = "" // Classes CSS adicionais
}) => {
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [error, setError] = useState('')

  // Estilos baseados no tema
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'

  // Função para enviar solicitação para o backend
  const handleSubmitRequest = async () => {
    if (!userInput.trim()) return

    setIsLoading(true)
    setError('')
    
    try {
      // Combina o conteúdo existente com a nova solicitação
      const combinedContent = contextContent 
        ? `${contextContent}\n\n**Nova solicitação:** ${userInput}`
        : userInput

      // Envia para o backend
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          previousContent: contextContent,
          userRequest: userInput,
          combinedContent: combinedContent,
          ...additionalData
        })
      })

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      const responseContent = data.response || data.content || data.message || ''
      
      setAiResponse(responseContent)
      setUserInput('') // Limpa o campo após envio
      
      // Callback opcional
      if (onResponse) {
        onResponse(responseContent, data)
      }
      
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error)
      setError(error.message || 'Não foi possível processar sua solicitação. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Função para limpar a resposta
  const handleClearResponse = () => {
    setAiResponse('')
    setError('')
  }

  // Componente de renderização do Markdown
  const MarkdownRenderer = ({ content }) => (
    <ReactMarkdown
      components={{
        // Parágrafos com melhor espaçamento
        p: ({node, ...props}) => (
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props} />
        ),
        
        // Títulos com hierarquia visual
        h1: ({node, ...props}) => (
          <h1 className="text-gray-900 dark:text-gray-100 text-2xl font-bold mb-4 mt-6 pb-2 border-b border-gray-200 dark:border-gray-700" {...props} />
        ),
        h2: ({node, ...props}) => (
          <h2 className="text-gray-900 dark:text-gray-100 text-xl font-semibold mb-3 mt-5" {...props} />
        ),
        h3: ({node, ...props}) => (
          <h3 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2 mt-4" {...props} />
        ),
        h4: ({node, ...props}) => (
          <h4 className="text-gray-900 dark:text-gray-100 text-base font-medium mb-2 mt-3" {...props} />
        ),
        
        // Código com syntax highlighting
        code: ({inline, className, children, ...props}) => {
          return inline ? (
            <code className="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-sm font-mono border" {...props}>
              {children}
            </code>
          ) : (
            <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-auto text-sm my-4 border" {...props}>
              <code className={className}>{children}</code>
            </pre>
          )
        },
        
        // Listas com melhor formatação
        ul: ({node, ...props}) => (
          <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-1 list-disc ml-6" {...props} />
        ),
        ol: ({node, ...props}) => (
          <ol className="text-gray-700 dark:text-gray-300 mb-4 space-y-1 list-decimal ml-6" {...props} />
        ),
        li: ({node, ...props}) => (
          <li className="mb-1 leading-relaxed" {...props} />
        ),
        
        // Links com hover states
        a: ({node, href, ...props}) => (
          <a 
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props} 
          />
        ),
        
        // Citações estilizadas
        blockquote: ({node, ...props}) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-50 dark:bg-gray-800 rounded-r italic text-gray-700 dark:text-gray-300" {...props} />
        ),
        
        // Tabelas responsivas
        table: ({node, ...props}) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg" {...props} />
          </div>
        ),
        thead: ({node, ...props}) => (
          <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
        ),
        th: ({node, ...props}) => (
          <th className="text-gray-900 dark:text-gray-100 px-4 py-2 text-left font-semibold border-b border-gray-200 dark:border-gray-700" {...props} />
        ),
        td: ({node, ...props}) => (
          <td className="text-gray-700 dark:text-gray-300 px-4 py-2 border-b border-gray-200 dark:border-gray-700" {...props} />
        ),
        
        // Linha horizontal
        hr: ({node, ...props}) => (
          <hr className="my-6 border-t border-gray-200 dark:border-gray-700" {...props} />
        ),
        
        // Texto forte e ênfase
        strong: ({node, ...props}) => (
          <strong className="text-gray-900 dark:text-gray-100 font-semibold" {...props} />
        ),
        em: ({node, ...props}) => (
          <em className="text-gray-700 dark:text-gray-300 italic" {...props} />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  )

  return (
    <div className={`w-full ${className}`}>
      {/* Campo de Entrada */}
      <div className={`p-4 rounded-xl border-2 border-blue-300 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={18} className="text-blue-500" />
          <h4 className={`font-semibold ${textPrimary}`}>{title}</h4>
        </div>
        
        <div className="space-y-3">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className={`w-full min-h-[100px] p-3 rounded-lg border resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isDarkMode 
                ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            rows={4}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleSubmitRequest()
              }
            }}
          />
          
          <div className="flex justify-between items-center">
            <span className={`text-xs ${textSecondary}`}>
              Ctrl/Cmd + Enter para enviar
            </span>
            <div className="flex gap-2">
              {aiResponse && (
                <button
                  onClick={handleClearResponse}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Limpar
                </button>
              )}
              <button
                onClick={handleSubmitRequest}
                disabled={!userInput.trim() || isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  !userInput.trim() || isLoading
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                    : isDarkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Enviar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exibição de Erro */}
      {error && (
        <div className={`mt-4 p-4 rounded-xl border-2 border-red-300 ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-red-500" />
            <h4 className={`font-semibold ${textPrimary}`}>Erro</h4>
          </div>
          <p className={`${textSecondary}`}>{error}</p>
        </div>
      )}

      {/* Resposta da IA */}
      {aiResponse && (
        <div className={`mt-4 p-4 rounded-xl border-2 border-green-300 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-green-500" />
            <h4 className={`font-semibold ${textPrimary}`}>Resposta da IA</h4>
          </div>
          <MarkdownRenderer content={aiResponse} />
        </div>
      )}
    </div>
  )
}

export default AIRequestField