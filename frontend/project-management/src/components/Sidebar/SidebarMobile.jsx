import React, { useState, useEffect } from 'react'
import { 
  Home,
  Clock,
  AlertCircle,
  CheckCircle2,
  Plus,
  BarChart3,
  Sun,
  Moon,
  Settings,
  User,
  X
} from 'lucide-react'

const SidebarMobile = ({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  toggleTheme, 
  filter, 
  onFilterChange, 
  onAddTask, 
  onShowStats,
  tasks = [] 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Cores baseadas no tema
  const bgPrimary = isDarkMode ? '#1f2937' : '#ffffff'
  const bgSecondary = isDarkMode ? '#374151' : '#f3f4f6'
  const textPrimary = isDarkMode ? '#ffffff' : '#111827'
  const textSecondary = isDarkMode ? '#d1d5db' : '#6b7280'
  const borderColor = isDarkMode ? '#374151' : '#e5e7eb'
  const hoverBg = isDarkMode ? '#374151' : '#f9fafb'

  // Gerenciar animações de abertura/fechamento
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setTimeout(() => setIsAnimating(true), 10) // Pequeno delay para trigger da animação
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300) // Tempo da animação
    }
  }, [isOpen])

  // Se não estiver visível, não renderizar
  if (!isVisible) return null

  // Contadores de tarefas por status
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    in_progress: tasks.filter(task => task.status === 'in_progress').length
  }

  const menuItems = [
    { 
      id: 'all', 
      label: 'Todas as Tarefas', 
      icon: Home,
      count: taskCounts.all 
    },
    { 
      id: 'pending', 
      label: 'Pendentes', 
      icon: Clock,
      count: taskCounts.pending 
    },
    { 
      id: 'in_progress', 
      label: 'Em Progresso', 
      icon: AlertCircle,
      count: taskCounts.in_progress 
    },
    { 
      id: 'completed', 
      label: 'Concluídas', 
      icon: CheckCircle2,
      count: taskCounts.completed 
    }
  ]

  const handleFilterChange = (filterId) => {
    onFilterChange(filterId)
    onClose()
  }

  const handleAddTask = () => {
    onAddTask()
    onClose()
  }

  const handleShowStats = () => {
    onShowStats()
    onClose()
  }

  const getButtonStyle = (isActive) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    marginBottom: '4px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive 
      ? (isDarkMode ? '#2563eb' : '#dbeafe')
      : 'transparent',
    color: isActive 
      ? (isDarkMode ? '#ffffff' : '#1e3a8a')
      : textSecondary
  })

  const actionButtonStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    marginBottom: '8px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }

  return (
    <>
      {/* Backdrop com fade */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(17, 24, 39, 0.8)',
          zIndex: 50,
          opacity: isAnimating ? 1 : 0,
          transition: 'opacity 0.3s ease-linear',
          display: window.innerWidth >= 1024 ? 'none' : 'block' // Ocultar em lg+
        }}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          display: 'flex',
          width: '100%',
          maxWidth: '320px',
          transform: isAnimating ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          pointerEvents: window.innerWidth >= 1024 ? 'none' : 'auto' // Desabilitar em lg+
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: bgPrimary,
            color: textPrimary,
            transition: 'colors 0.3s ease',
            marginRight: '64px' // Espaço para o botão de fechar
          }}
        >
          {/* Botão de fechar */}
          <div
            style={{
              position: 'absolute',
              left: '100%',
              top: 0,
              display: 'flex',
              width: '64px',
              justifyContent: 'center',
              paddingTop: '20px',
              opacity: isAnimating ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                margin: '-10px',
                padding: '10px',
                background: 'rgba(17, 24, 39, 0.8)',
                border: 'none',
                borderRadius: '50%',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(17, 24, 39, 0.9)'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(17, 24, 39, 0.8)'
                e.target.style.transform = 'scale(1)'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Header da Sidebar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
            borderBottom: `1px solid ${borderColor}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#2563eb',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <CheckCircle2 size={18} />
              </div>
              <h1 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: textPrimary,
                margin: 0
              }}>
                TaskManager
              </h1>
            </div>
          </div>

          {/* Navegação Principal */}
          <nav style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto'
          }}>
            <div style={{
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '600',
                color: textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px',
                margin: '0 0 12px 0',
                paddingLeft: '16px'
              }}>
                Navegação
              </h3>
              
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = filter === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleFilterChange(item.id)}
                    style={getButtonStyle(isActive)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = hoverBg
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon size={18} style={{ flexShrink: 0 }} />
                      <span>{item.label}</span>
                    </div>
                    {item.count > 0 && (
                      <span style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '12px',
                        backgroundColor: isActive 
                          ? (isDarkMode ? '#1d4ed8' : '#93c5fd')
                          : bgSecondary,
                        color: isActive 
                          ? (isDarkMode ? '#ffffff' : '#1e3a8a')
                          : textSecondary,
                        minWidth: '20px',
                        textAlign: 'center'
                      }}>
                        {item.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Ações Rápidas */}
          <div style={{
            padding: '16px',
            borderTop: `1px solid ${borderColor}`
          }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              margin: '0 0 12px 0',
              paddingLeft: '16px'
            }}>
              Ações
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                onClick={handleAddTask}
                style={{
                  ...actionButtonStyle,
                  backgroundColor: '#2563eb',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1d4ed8'
                  e.target.style.transform = 'translateY(-1px)'
                  e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2563eb'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <Plus size={18} />
                <span>Nova Tarefa</span>
              </button>
              
              <button
                onClick={handleShowStats}
                style={{
                  ...actionButtonStyle,
                  backgroundColor: 'transparent',
                  color: textSecondary
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = hoverBg
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                }}
              >
                <BarChart3 size={18} />
                <span>Estatísticas</span>
              </button>
            </div>
          </div>

          {/* Footer com Configurações */}
          <div style={{
            padding: '16px',
            borderTop: `1px solid ${borderColor}`
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                onClick={toggleTheme}
                style={{
                  ...actionButtonStyle,
                  backgroundColor: 'transparent',
                  color: textSecondary,
                  marginBottom: '4px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = hoverBg
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                }}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
              </button>
              
              <button
                style={{
                  ...actionButtonStyle,
                  backgroundColor: 'transparent',
                  color: textSecondary,
                  marginBottom: '16px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = hoverBg
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                }}
              >
                <Settings size={18} />
                <span>Configurações</span>
              </button>
            </div>

            {/* Perfil do Usuário */}
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: bgSecondary,
              border: `1px solid ${borderColor}`
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}>
                  <User size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: textPrimary,
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    Usuário
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: textSecondary,
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    ext-123456
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarMobile