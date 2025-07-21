import React from 'react'
import { Search, Filter, Plus, BarChart3, TrendingUp, Settings } from 'lucide-react'

const TaskControls = ({ 
  searchTerm, 
  onSearchChange, 
  filter, 
  onFilterChange, 
  onAddTask,
  onShowStats,
  isDarkMode,
  networkStatus,
  onShowProjectConfig, // Nova prop
  projectConfig // Nova prop
}) => {
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'
  const inputBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50'

  const isProjectConfigured = projectConfig?.projectName && projectConfig?.objective

  const filterOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'in_progress', label: 'Em Progresso' },
    { value: 'completed', label: 'Concluídas' }
  ]

  return (
    <div className={`${bgCard} rounded-xl border ${borderColor} p-6 mb-6`}>
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Lado Direito - Botões de Ação */}
        <div className="flex flex-wrap gap-2 justify-end">
           {/* Filtro Dropdown - Visível apenas em mobile/tablet */}
           <div className="">
            <div className="relative">
              <Filter size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} />
              <select
                value={filter}
                onChange={(e) => onFilterChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none`}
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
         

          {/* Botão Estatísticas */}
          <button
            onClick={onShowStats}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transform hover:scale-105`}
          >
            <TrendingUp size={18} />
            <span className="hidden sm:inline">Estatísticas</span>
          </button>

          {/* Novo Botão Configurações do Projeto */}
          <button
            onClick={onShowProjectConfig}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
              isProjectConfigured
                ? isDarkMode
                  ? 'bg-purple-900 hover:bg-purple-800 text-purple-300'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                : 'bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900 dark:hover:bg-orange-800 dark:text-orange-300'
            }`}
            title={isProjectConfigured ? 'Configurações do Projeto' : 'Projeto não configurado - Clique para configurar'}
          >
            <Settings size={18} />
            <span className="hidden sm:inline">
              {isProjectConfigured ? 'Config. Projeto' : 'Configurar'}
            </span>
            {!isProjectConfigured && (
              <span className="hidden lg:inline text-xs bg-orange-500 text-white px-2 py-1 rounded-full ml-1">
                !
              </span>
            )}
          </button>
        </div>
        {/* Lado Esquerdo - Busca e Filtro */}
        <div className="flex flex-wrap gap-2">
           {/* Botão Nova Tarefa */}
           <button
            onClick={onAddTask}
            disabled={!networkStatus?.allServersOnline}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              networkStatus?.allServersOnline
                ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Plus size={18} />
            <span className="">Nova Tarefa</span>
          </button>
          {/* Campo de Busca */}
          <div className="relative flex-1 max-w-md">
            <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
          </div>

         
        </div>

        
      </div>

      {/* Indicador de Status do Projeto */}
      {isProjectConfigured && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={`text-sm ${textSecondary}`}>
                Projeto: <span className="font-medium">{projectConfig.projectName}</span>
              </span>
            </div>
            <div className="flex gap-2 text-xs">
              {projectConfig.projectType && (
                <span className={`px-2 py-1 rounded ${
                  projectConfig.projectType === 'fullstack' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                  projectConfig.projectType === 'frontend' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                  'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                }`}>
                  {projectConfig.projectType}
                </span>
              )}
              {projectConfig.programmingLanguage && (
                <span className={`px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300`}>
                  {projectConfig.programmingLanguage}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskControls