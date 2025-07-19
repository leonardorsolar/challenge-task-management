import React from 'react'
import { Edit2, Trash2, User, Calendar, CheckCircle, Clock, AlertCircle, XCircle, Sparkles } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

const TaskCard = ({ task, onEdit, onDelete, onViewAISuggestion, isDarkMode }) => {


  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in_progress':
        return 'text-blue-600 bg-blue-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />
      case 'in_progress':
        return <Clock size={16} />
      case 'pending':
        return <AlertCircle size={16} />
      default:
        return <XCircle size={16} />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500'
      case 'medium':
        return 'border-l-yellow-500'
      case 'low':
        return 'border-l-green-500'
      default:
        return 'border-l-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Concluída'
      case 'in_progress':
        return 'Em progresso'
      case 'pending':
        return 'Pendente'
      default:
        return 'Desconhecido'
    }
  }

  // const formatDate = (dateString) => {
  //   if (!dateString) return ''
  //   const date = new Date(dateString)
  //   return date.toLocaleDateString('pt-BR')
  // }

  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  //const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'
  

  return (
    <div
  className={`${bgCard} rounded-lg p-4 border-l-4 ${getPriorityColor(task.priority)} border ${borderColor} hover:shadow-md transition-all duration-300 text-sm`}
>
  <div className="flex justify-between items-start gap-4">
    {/* Conteúdo principal */}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-base font-semibold leading-tight">{task.title}</h3>
       
      </div>

      {task.description && (
        <p className={`${textSecondary} mb-2 leading-snug`}>
          {task.description}
        </p>
      )}

<div className="flex items-center justify-start gap-4 text-xs">
  {/* Prioridade */}
  <div className="flex items-center gap-1">
    <User size={14} className={textSecondary} />
    <span className={textSecondary}>
      Prioridade: {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
    </span>
  </div>

  {/* Vencimento */}
  {task.created_at && (
    <div className="flex items-center gap-1">
      <Calendar size={14} className={textSecondary} />
      <span className={textSecondary}>
        Vencimento: {formatDate(task.created_at)}
      </span>
    </div>
  )}

  {/* Status */}
  <div className="flex items-center gap-1">
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(task.status)}`}>
      {getStatusIcon(task.status)}
      {getStatusText(task.status)}
    </span>
  </div>
</div>

    </div>

    <div className="flex flex-col items-end gap-2">
          {/* Botão de Sugestão IA - só mostra se existe aiSuggestion  */}
          {/* {onViewAISuggestion && ( */}
            {true && (
            <button
              onClick={() => onViewAISuggestion(task)}
              className={`p-1.5 rounded-md transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'hover:bg-green-700 text-green-300 bg-green-800/50' 
                  : 'hover:bg-green-100 text-green-600 bg-green-50'
              }`}
              title="Ver sugestões da IA"
            >
              <Sparkles size={16} />
            </button>
          )}
</div>
    {/* Ações */}
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={() => onEdit(task)}
        className={`p-1.5 rounded-md transition-all duration-300 hover:scale-105 ${
          isDarkMode 
            ? 'hover:bg-gray-700 text-gray-300' 
            : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        <Edit2 size={16} />
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className="p-1.5 rounded-md transition-all duration-300 hover:scale-105 hover:bg-red-100 text-red-500"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
</div>

  )
}

export default TaskCard