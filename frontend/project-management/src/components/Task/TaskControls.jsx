import React from 'react'
import { Search, Filter, Plus, BarChart3 } from 'lucide-react'

const TaskControls = ({ 
  searchTerm, 
  onSearchChange, 
  filter, 
  onFilterChange, 
  onAddTask,
  onShowStats,
  isDarkMode 
}) => {
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'

 

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Search */}
      <div className="flex items-center gap-2 w-full">
            <div className="flex-1 relative">
              <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} />
              <input
                type="text"
                placeholder="Pesquisar tarefas..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${borderColor} ${bgCard} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>

            {/* Filter */}
            
            <div className="flex items-center gap-2">
              <Filter size={20} className={textSecondary} />
              <select
                value={filter}
                onChange={(e) => onFilterChange(e.target.value)}
                className={`px-4 py-3 rounded-xl border ${borderColor} ${bgCard} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="all">Todas</option>
                <option value="pending"> Pendentes</option>
                <option value="in_progress">Em Progresso</option>
                <option value="completed">Concluídas</option>
              </select>
              </div>
        </div>
      <div className="flex items-center gap-2 w-full">
  {/* Filtro */}
  
{/* Add Task Button */}
        <button
                onClick={onAddTask}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border ${borderColor} transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                <span>Nova Tarefa</span>
              </button>
          {/* Botão de Estatísticas alinhado à direita */}
          <button
            onClick={onShowStats}
            className={`ml-auto flex items-center gap-2 px-4 py-3 rounded-xl border ${borderColor} transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Ver Estatísticas"
          >
            <BarChart3 size={20} />
            <span className="hidden sm:inline">Stats</span>
          </button>
        </div>


      
    </div>
  )
}

export default TaskControls