import React, { useEffect } from 'react'
import { X, Sparkles, Calendar, User, AlertCircle, Lightbulb } from 'lucide-react'

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
  if (!isOpen || !task) return null

  //const aiSuggestion = task.aiSuggestion

  // Mock para testes se não há aiSuggestion
  const mockAISuggestion = {
    suggestedDescription: `Análise detalhada para: ${task.title}`,
    suggestedPriority: 'medium',
    suggestedStatus: 'pending',
    suggestedDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reasoning: 'Com base no título e contexto da tarefa, sugiro uma abordagem estruturada com planejamento adequado.',
    generatedAt: new Date().toISOString()
  };
  
  // const finalAISuggestion = aiSuggestion || mockAISuggestion;

  const aiSuggestion = mockAISuggestion;

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
                Sugestões da IA ( mock sem backend)
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
          {/* Descrição Sugerida */}
          {aiSuggestion.suggestedDescription && (
            <div className={`p-4 rounded-xl border ${borderColor} ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={18} className="text-blue-500" />
                <h4 className={`font-semibold ${textPrimary}`}>Descrição Sugerida</h4>
              </div>
              <p className={`${textSecondary} leading-relaxed`}>
                {aiSuggestion.suggestedDescription}
              </p>
            </div>
          )}

          {/* Informações da Tarefa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prioridade Sugerida */}
            {aiSuggestion.suggestedPriority && (
              <div className={`p-4 rounded-xl border ${borderColor} ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-orange-500" />
                  <h5 className={`font-medium ${textPrimary}`}>Prioridade Sugerida</h5>
                </div>
                <p className={`${textSecondary}`}>
                  {formatPriority(aiSuggestion.suggestedPriority)}
                </p>
              </div>
            )}

            {/* Status Sugerido */}
            {aiSuggestion.suggestedStatus && (
              <div className={`p-4 rounded-xl border ${borderColor} ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} className="text-green-500" />
                  <h5 className={`font-medium ${textPrimary}`}>Status Sugerido</h5>
                </div>
                <p className={`${textSecondary}`}>
                  {formatStatus(aiSuggestion.suggestedStatus)}
                </p>
              </div>
            )}

            {/* Data Sugerida */}
            {aiSuggestion.suggestedDueDate && (
              <div className={`p-4 rounded-xl border ${borderColor} ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} md:col-span-2`}>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-purple-500" />
                  <h5 className={`font-medium ${textPrimary}`}>Data de Vencimento Sugerida</h5>
                </div>
                <p className={`${textSecondary}`}>
                  {formatDate(aiSuggestion.suggestedDueDate)}
                </p>
              </div>
            )}
          </div>

          {/* Justificativa */}
          {aiSuggestion.reasoning && (
            <div className={`p-4 rounded-xl border-2 border-purple-300 ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-purple-500" />
                <h4 className={`font-semibold ${textPrimary}`}>Justificativa da IA</h4>
              </div>
              <p className={`${textSecondary} leading-relaxed`}>
                {aiSuggestion.reasoning}
              </p>
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