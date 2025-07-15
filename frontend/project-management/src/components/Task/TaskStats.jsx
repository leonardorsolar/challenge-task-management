import React, { useEffect } from 'react'
import { CheckCircle, AlertCircle, Clock, X, TrendingUp, Target, Calendar, Award } from 'lucide-react'

const TaskStats = ({ tasks, isDarkMode, isOpen, onClose }) => {
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const bgOverlay = isDarkMode ? 'bg-gray-900' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'

  // Fechar modal com tecla ESC
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

  const stats = [
    {
      label: 'Total de Tarefas',
      value: tasks.length,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Total de tarefas criadas'
    },
    {
      label: 'Pendentes',
      value: tasks.filter(t => t.status === 'pending').length,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Aguardando início'
    },
    {
      label: 'Em Progresso',
      value: tasks.filter(t => t.status === 'in_progress').length,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Sendo executadas'
    },
    {
      label: 'Concluídas',
      value: tasks.filter(t => t.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Finalizadas com sucesso'
    }
  ]

  // Calcular métricas adicionais
  const completionRate = tasks.length > 0 ? ((stats[3].value / tasks.length) * 100).toFixed(1) : 0
  const inProgressRate = tasks.length > 0 ? ((stats[2].value / tasks.length) * 100).toFixed(1) : 0
  
  // Tarefas por prioridade
  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length
  const mediumPriorityTasks = tasks.filter(t => t.priority === 'medium').length
  const lowPriorityTasks = tasks.filter(t => t.priority === 'low').length

  // Tarefas com vencimento próximo (próximos 7 dias)
  const now = new Date()
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const upcomingTasks = tasks.filter(t => {
    if (!t.dueDate) return false
    const dueDate = new Date(t.dueDate)
    return dueDate >= now && dueDate <= nextWeek && t.status !== 'completed'
  }).length

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleBackdropClick}
      />
      
      {/* Slider Modal */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md ${bgOverlay} z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } border-l ${borderColor} shadow-2xl flex flex-col`}>
        
        {/* Header */}
        <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <TrendingUp size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold">Estatísticas</h2>
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

        {/* Content with proper scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Status Overview */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                <Target size={18} />
                Status das Tarefas
              </h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className={`${bgCard} rounded-xl p-4 border ${borderColor}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                          <stat.icon size={20} className={stat.color} />
                        </div>
                        <div>
                          <p className="font-medium">{stat.label}</p>
                          <p className={`text-sm ${textSecondary}`}>{stat.description}</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Metrics */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                <TrendingUp size={18} />
                Progresso
              </h3>
              <div className="space-y-4">
                <div className={`${bgCard} rounded-xl p-4 border ${borderColor}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Taxa de Conclusão</span>
                    <span className="text-xl font-bold text-green-600">{completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>

                <div className={`${bgCard} rounded-xl p-4 border ${borderColor}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Em Andamento</span>
                    <span className="text-xl font-bold text-blue-600">{inProgressRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${inProgressRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Breakdown */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                <Award size={18} />
                Por Prioridade
              </h3>
              <div className="space-y-3">
                <div className={`${bgCard} rounded-xl p-4 border ${borderColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="font-medium">Alta Prioridade</span>
                    </div>
                    <span className="text-lg font-bold">{highPriorityTasks}</span>
                  </div>
                </div>
                
                <div className={`${bgCard} rounded-xl p-4 border ${borderColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="font-medium">Média Prioridade</span>
                    </div>
                    <span className="text-lg font-bold">{mediumPriorityTasks}</span>
                  </div>
                </div>
                
                <div className={`${bgCard} rounded-xl p-4 border ${borderColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Baixa Prioridade</span>
                    </div>
                    <span className="text-lg font-bold">{lowPriorityTasks}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                <Calendar size={18} />
                Próximos Vencimentos
              </h3>
              <div className={`${bgCard} rounded-xl p-4 border ${borderColor}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Próximos 7 dias</p>
                    <p className={`text-sm ${textSecondary}`}>Tarefas com vencimento próximo</p>
                  </div>
                  <span className={`text-2xl font-bold ${upcomingTasks > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    {upcomingTasks}
                  </span>
                </div>
                {upcomingTasks > 0 && (
                  <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      ⚠️ Você tem {upcomingTasks} tarefa{upcomingTasks !== 1 ? 's' : ''} vencendo nos próximos 7 dias
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Extra padding at bottom for better scroll */}
            <div className="h-8"></div>

          </div>
        </div>
      </div>
    </>
  )
}

export default TaskStats