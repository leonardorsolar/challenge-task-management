import React from 'react'
import { CheckCircle } from 'lucide-react'
import TaskCard from './TaskCard'

const TaskList = ({ 
  tasks, 
  searchTerm, 
  filter, 
  onEditTask, 
  onDeleteTask, 
  onViewAISuggestion, // Nova prop adicionada
  isDarkMode,
  networkStatus
}) => {
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (filteredTasks.length === 0) {
    return (
      <div className={`${bgCard} rounded-xl p-12 text-center border ${borderColor}`}>
        <div className="mb-4">
          <CheckCircle size={48} className={`mx-auto ${textSecondary} opacity-50`} />
        </div>
        <p className={`text-lg ${textSecondary}`}>
          {searchTerm || filter !== 'all' 
            ? 'Nenhuma tarefa encontrada com os filtros aplicados' 
            : 'Nenhuma tarefa criada ainda'}
        </p>
        <p className={`text-sm ${textSecondary} mt-2`}>
          {!searchTerm && filter === 'all' && 'Clique em "Nova Tarefa" para começar'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onViewAISuggestion={onViewAISuggestion} // Passando a nova prop
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  )
}

export default TaskList