import React, { useEffect } from 'react'
import { X, Sparkles, Calendar, User, AlertCircle, Lightbulb } from 'lucide-react'
import ReactMarkdown from 'react-markdown';

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
  console.log("AISuggestionModal")
  console.log(isOpen, task)

 

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

 if (!task?.aiSuggestion) {
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


const aiSuggestion = task.aiSuggestion;

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
                   {aiSuggestion.reasoning && (
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
             p: ({node, ...props}) => <p className="text-gray-700 mb-2" {...props} />,
             code: ({inline, className, children, ...props}) => {
               return inline ? (
                 <code className="bg-gray-200 px-1 rounded" {...props}>{children}</code>
               ) : (
                 <pre className="bg-gray-900 text-white p-3 rounded overflow-auto" {...props}>
                   <code className={className}>{children}</code>
                 </pre>
               )
             },
             li: ({node, ...props}) => <li className="ml-6 list-disc mb-1" {...props} />
           }}
         >
           {aiSuggestion.reasoning}
         </ReactMarkdown>
                     </div>
                   )}

          {/* Timestamp */}
          {aiSuggestion.generatedAt && (
            <div className="text-center">
              <p className={`text-xs ${textSecondary}`}>
                Sugestões geradas em: {new Date(aiSuggestion.generatedAt).toLocaleString('pt-BR')}
              </p>
            </div>
          )}
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