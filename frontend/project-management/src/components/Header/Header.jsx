import React from 'react'
import { 
  Bars3Icon,
  SunIcon,
  MoonIcon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

const Header = ({ isDarkMode, onToggleTheme, onOpenSidebar }) => {
  const bgPrimary = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'
  const hoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'

  return (
    <header className={`${bgPrimary} ${textPrimary} border-b ${borderColor} transition-colors duration-300`}>
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Lado Esquerdo - Botão Menu Mobile + Título */}
        <div className="flex items-center space-x-4">
          {/* Botão Menu Mobile */}
          <button
            type="button"
            className={`lg:hidden p-2 rounded-md ${hoverBg} transition-colors duration-200`}
            onClick={onOpenSidebar}
          >
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Título Mobile */}
          <div className="flex items-center space-x-3 lg:hidden">
            <h1 className="text-xl font-bold">TaskManager</h1>
          </div>

          {/* Breadcrumb ou Título da Página - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <h2 className="text-lg font-medium">Dashboard</h2>
            <span className={`text-sm ${textSecondary}`}>/ Gerenciar Tarefas</span>
          </div>
        </div>

        {/* Lado Direito - Ações e Perfil */}
        <div className="flex items-center space-x-3">
          {/* Toggle Theme - Desktop */}
          <button
            onClick={onToggleTheme}
            className={`hidden sm:flex items-center justify-center w-9 h-9 rounded-lg ${hoverBg} transition-colors duration-200`}
            title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>

          {/* Notificações */}
          <button
            className={`relative flex items-center justify-center w-9 h-9 rounded-lg ${hoverBg} transition-colors duration-200`}
            title="Notificações"
          >
            <BellIcon className="w-5 h-5" />
            {/* Badge de notificação */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Perfil do Usuário */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">Usuário</p>
              <p className={`text-xs ${textSecondary}`}>ext-123456</p>
            </div>
            <button
              className={`flex items-center justify-center w-9 h-9 rounded-lg ${hoverBg} transition-colors duration-200`}
            >
              <UserCircleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header