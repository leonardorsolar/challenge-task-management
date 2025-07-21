import React, { useEffect } from 'react'
import { X, Sparkles, Calendar, User, AlertCircle, Lightbulb } from 'lucide-react'
import ReactMarkdown from 'react-markdown';
import AIRequestField from '../Chat/AIRequestField';

const AISuggestionModal = ({ 
  isOpen, 
  task, 
  onClose, 
  isDarkMode 
}) => {
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'
  //console.log("AISuggestionModal")
  //console.log(isOpen, task)

 

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

 // if (!isOpen || !task?.aiSuggestion) return null
 if (!isOpen) return null;

 if (!task?.generateAIResponse) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className={`${bgCard} rounded-xl shadow-2xl w-full max-w-md p-6 text-center border ${borderColor}`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-red-500">Esta tarefa ainda não possui sugestão da IA.</p>
        <button
          onClick={onClose}
          className={`mt-4 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 font-medium ${
            isDarkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
console.log("aqui")
//console.log(task.generateAIResponse)

let aiSuggestion;
try {
  aiSuggestion = JSON.parse(task.generateAIResponse);
} catch (e) {
  console.error("Erro ao fazer parse do JSON da sugestão da IA:", e);
  return null;
}

console.log(aiSuggestion)



  const formatPriority = (priority) => {
    switch (priority) {
      case 'high': return 'Alta'
      case 'medium': return 'Média'
      case 'low': return 'Baixa'
      default: return priority
    }
  }

  const formatStatus = (status) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'in_progress': return 'Em Progresso'
      case 'completed': return 'Concluída'
      default: return status
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  const handleResponse = (response, fullData) => {
    console.log('Nova resposta recebida:', response)
    // Aqui você pode fazer algo com a resposta, como salvar em estado
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className={`${bgCard} rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border ${borderColor}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${textPrimary}`}>
                Sugestões da IA 
              </h3>
              <p className={`text-sm ${textSecondary}`}>
                Para a tarefa: {task.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Informações da Tarefa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          </div>

          {/* Justificativa */}
          {/* Justificativa */}
                   {aiSuggestion.content && (
                     <div className={`p-4 rounded-xl border-2 border-purple-300 ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                       <div className="flex items-center gap-2 mb-3">
                         <Sparkles size={18} className="text-purple-500" />
                         <h4 className={`font-semibold ${textPrimary}`}>Justificativa da IA</h4>
                       </div>
                       {/* <p className={`${textSecondary} leading-relaxed`}>
                         {aiSuggestion.reasoning}
                       </p> */}
                       <ReactMarkdown
  components={{
    // Parágrafos com melhor espaçamento e responsividade
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
    
    // Código melhorado com dark mode
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
      <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-1" {...props} />
    ),
    ol: ({node, ...props}) => (
      <ol className="text-gray-700 dark:text-gray-300 mb-4 space-y-1 list-decimal" {...props} />
    ),
    li: ({node, ...props}) => (
      <li className="ml-6 list-disc mb-1 leading-relaxed" {...props} />
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
  {aiSuggestion.content}
</ReactMarkdown>
                     </div>
                   )}

        </div>

        <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4">Com Contexto Existente</h2> */}
      <AIRequestField 
        isDarkMode={isDarkMode}
        contextContent={aiSuggestion?.content || ''}
        placeholder="Ex: Crie um diagrama de atividades"
        title="Expandir Sugestão da IA"
        onResponse={handleResponse}
        additionalData={{
          taskId: 'task-123',
          type: 'expansion'
        }}
      />
    </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${borderColor} flex justify-end`}>
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 font-medium ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AISuggestionModal