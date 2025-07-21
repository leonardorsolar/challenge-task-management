import React, { useState, useEffect } from 'react'
import { Settings, X, Code, Database, Layers, Target, FileText, Save } from 'lucide-react'

const ProjectConfigModal = ({ isOpen, onClose, isDarkMode, projectConfig, onSaveConfig }) => {
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const bgOverlay = isDarkMode ? 'bg-gray-900' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'
  const inputBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
  const inputBorder = isDarkMode ? 'border-gray-600' : 'border-gray-300'

  const [config, setConfig] = useState({
    projectName: '',
    objective: '',
    projectType: 'fullstack', // frontend, backend, fullstack
    programmingLanguage: '',
    architecture: '', // apenas para backend
    frontendFramework: '',
    backendFramework: '',
    database: '',
    ...projectConfig
  })

  // Listas de opções
  const projectTypes = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Fullstack' }
  ]

  const programmingLanguages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C#',
    'PHP',
    'Ruby',
    'Go',
    'Rust',
    'Kotlin',
    'Swift',
    'Dart'
  ]

  const architectures = [
    'MVC (Model-View-Controller)',
    'MVVM (Model-View-ViewModel)',
    'Clean Architecture',
    'Hexagonal Architecture',
    'Microservices',
    'Monolith',
    'Serverless',
    'Event-Driven',
    'REST API',
    'GraphQL',
    'SOA (Service-Oriented Architecture)'
  ]

  const frontendFrameworks = [
    'React',
    'Vue.js',
    'Angular',
    'Svelte',
    'Next.js',
    'Nuxt.js',
    'Vanilla JS',
    'jQuery',
    'Bootstrap',
    'Tailwind CSS'
  ]

  const backendFrameworks = [
    'Express.js',
    'Nest.js',
    'Django',
    'Flask',
    'FastAPI',
    'Spring Boot',
    'ASP.NET Core',
    'Laravel',
    'Ruby on Rails',
    'Gin (Go)',
    'Actix (Rust)',
    'Fiber (Go)'
  ]

  const databases = [
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'SQLite',
    'Redis',
    'Firebase',
    'Supabase',
    'Oracle',
    'SQL Server',
    'DynamoDB',
    'Cassandra',
    'Neo4j'
  ]

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

  const handleInputChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    onSaveConfig(config)
    onClose()
  }

  const isFormValid = config.projectName.trim() && config.objective.trim()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleBackdropClick}
      />
      
      {/* Slider Modal */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-lg ${bgOverlay} z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } border-l ${borderColor} shadow-2xl flex flex-col`}>
        
        {/* Header */}
        <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <Settings size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold">Configurações do Projeto</h2>
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
            
            {/* Informações Básicas */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                <FileText size={18} />
                Informações Básicas
              </h3>
              
              <div className="space-y-4">
                {/* Nome do Projeto */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                    Nome do Projeto *
                  </label>
                  <input
                    type="text"
                    value={config.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                    placeholder="Ex: Sistema de Gerenciamento de Tarefas"
                    className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  />
                </div>

                {/* Objetivo */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                    Objetivo do Projeto *
                  </label>
                  <textarea
                    value={config.objective}
                    onChange={(e) => handleInputChange('objective', e.target.value)}
                    placeholder="Descreva o objetivo principal do projeto..."
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none`}
                  />
                </div>

                {/* Tipo do Projeto */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                    Tipo do Projeto
                  </label>
                  <select
                    value={config.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  >
                    {projectTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tecnologias */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                <Code size={18} />
                Tecnologias
              </h3>
              
              <div className="space-y-4">
                {/* Linguagem de Programação */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                    Linguagem de Programação Principal
                  </label>
                  <select
                    value={config.programmingLanguage}
                    onChange={(e) => handleInputChange('programmingLanguage', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  >
                    <option value="">Selecione uma linguagem</option>
                    {programmingLanguages.map(lang => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Framework Frontend - mostrar se não for apenas backend */}
                {config.projectType !== 'backend' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                      Framework/Biblioteca Frontend
                    </label>
                    <select
                      value={config.frontendFramework}
                      onChange={(e) => handleInputChange('frontendFramework', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Selecione um framework</option>
                      {frontendFrameworks.map(framework => (
                        <option key={framework} value={framework}>
                          {framework}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Framework Backend - mostrar se não for apenas frontend */}
                {config.projectType !== 'frontend' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                      Framework Backend
                    </label>
                    <select
                      value={config.backendFramework}
                      onChange={(e) => handleInputChange('backendFramework', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Selecione um framework</option>
                      {backendFrameworks.map(framework => (
                        <option key={framework} value={framework}>
                          {framework}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Arquitetura - apenas para backend/fullstack */}
            {config.projectType !== 'frontend' && (
              <div>
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                  <Layers size={18} />
                  Arquitetura
                </h3>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                    Padrão Arquitetural
                  </label>
                  <select
                    value={config.architecture}
                    onChange={(e) => handleInputChange('architecture', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  >
                    <option value="">Selecione uma arquitetura</option>
                    {architectures.map(arch => (
                      <option key={arch} value={arch}>
                        {arch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Banco de Dados */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                <Database size={18} />
                Banco de Dados
              </h3>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                  Sistema de Banco de Dados
                </label>
                <select
                  value={config.database}
                  onChange={(e) => handleInputChange('database', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                >
                  <option value="">Selecione um banco de dados</option>
                  {databases.map(db => (
                    <option key={db} value={db}>
                      {db}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resumo da Configuração */}
            {isFormValid && (
              <div className={`${bgCard} rounded-xl p-4 border ${borderColor}`}>
                <h4 className={`font-semibold mb-3 flex items-center gap-2 ${textPrimary}`}>
                  <Target size={16} />
                  Resumo da Configuração
                </h4>
                <div className={`space-y-2 text-sm ${textSecondary}`}>
                  <p><strong>Projeto:</strong> {config.projectName}</p>
                  <p><strong>Tipo:</strong> {projectTypes.find(t => t.value === config.projectType)?.label}</p>
                  {config.programmingLanguage && <p><strong>Linguagem:</strong> {config.programmingLanguage}</p>}
                  {config.frontendFramework && <p><strong>Frontend:</strong> {config.frontendFramework}</p>}
                  {config.backendFramework && <p><strong>Backend:</strong> {config.backendFramework}</p>}
                  {config.architecture && <p><strong>Arquitetura:</strong> {config.architecture}</p>}
                  {config.database && <p><strong>Banco:</strong> {config.database}</p>}
                </div>
              </div>
            )}

            {/* Extra padding at bottom */}
            <div className="h-8"></div>
          </div>
        </div>

        {/* Footer com botão de salvar */}
        <div className={`px-6 py-4 border-t ${borderColor} flex-shrink-0`}>
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              isFormValid
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transform hover:scale-105'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save size={18} />
            Salvar Configurações
          </button>
        </div>
      </div>
    </>
  )
}

export default ProjectConfigModal