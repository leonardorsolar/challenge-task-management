import React, { useEffect } from 'react'
import { Check, X } from 'lucide-react'

// Componente TaskForm Modal
const TaskForm = ({ 
  isOpen,
  task, 
  onTaskChange,
  onSubmit, 
  onCancel, 
  isEditing, 
  isDarkMode 
}) => {
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel()
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
  }, [isOpen, onCancel])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.title.trim()) {
      onSubmit()
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className={`${bgCard} rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border ${borderColor}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
          <h3 className="text-xl font-semibold">
            {isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h3>
          <button
            onClick={onCancel}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                Título *
              </label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => onTaskChange({ ...task, title: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${borderColor} ${bgCard} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                placeholder="Digite o título da tarefa"
                required
                autoFocus
              />
            </div>

            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                Descrição
              </label>
              <textarea
                value={task.description}
                onChange={(e) => onTaskChange({ ...task, description: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${borderColor} ${bgCard} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                placeholder="Digite a descrição da tarefa"
                rows="4"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                Status
              </label>
              <select
                value={task.status}
                onChange={(e) => onTaskChange({ ...task, status: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${borderColor} ${bgCard} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              >
                <option value="pending">Pendente</option>
                <option value="in_progress">Em Progresso</option>
                <option value="completed">Concluída</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                Prioridade
              </label>
              <select
                value={task.priority}
                onChange={(e) => onTaskChange({ ...task, priority: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${borderColor} ${bgCard} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                Data de Vencimento
              </label>
              <input
                type="date"
                value={task.dueDate}
                onChange={(e) => onTaskChange({ ...task, dueDate: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${borderColor} ${bgCard} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={!task.title.trim()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 font-medium ${
                task.title.trim()
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Check size={20} />
              <span>{isEditing ? 'Salvar Alterações' : 'Criar Tarefa'}</span>
            </button>
            
            <button
              type="button"
              onClick={onCancel}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 font-medium ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <X size={20} />
              <span>Cancelar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm