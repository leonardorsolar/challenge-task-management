import React, { useEffect, useState } from 'react'
import { Sun, Moon, CheckCircle } from 'lucide-react'

const Header = ({ isDarkMode, onToggleTheme }) => {
  const [userName, setUserName] = useState('')
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'

  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'

  useEffect(() => {
    fetch('http://localhost:8000/users/1')
      .then(response => response.json())
      .then(data => setUserName(data.name))
      .catch(err => console.error('Erro ao buscar usuário:', err))
  }, [])


  return (
    <header className={`${bgCard} shadow-sm border-b ${borderColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            {/* <div className="p-2 bg-gradient-to-r from-gray-300 from-gray-300 rounded-lg">
              <CheckCircle size={24} className="text-white" />
            </div> */}
            <div className="mb-4">
                      <CheckCircle size={32} className={`mx-auto mt-4 ${textSecondary} opacity-50`} />
                    </div>
            <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
            {userName && (
              <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {userName}
              </span>
            )}
          </div>
          
          <button
            onClick={onToggleTheme}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-white' 
                : 'hover:bg-gray-100 text-gray-900'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header