// components/Network/OfflineScreen.jsx
import React from 'react';
import {
  WifiIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ServerIcon,
  SignalIcon,
  XCircleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const OfflineScreen = ({
  isOnline,
  nodeServerStatus,
  pythonServerStatus,
  isCheckingServers,
  onRecheck,
  isDarkMode = false
}) => {
  const bgOverlay = isDarkMode ? 'bg-gray-900/95' : 'bg-white/95';
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  const getServerStatusIcon = (status) => {
    if (status === null) {
      return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    }
    return status ? (
      <CheckCircleIcon className="w-5 h-5 text-green-500" />
    ) : (
      <XCircleIcon className="w-5 h-5 text-red-500" />
    );
  };

  const getServerStatusText = (status) => {
    if (status === null) return 'Verificando...';
    return status ? 'Online' : 'Offline';
  };

  const getServerStatusColor = (status) => {
    if (status === null) return 'text-yellow-600';
    return status ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className={`fixed inset-0 z-50 ${bgOverlay} backdrop-blur-sm flex items-center justify-center p-4`}>
      <div className={`${bgCard} rounded-2xl shadow-2xl border ${borderColor} max-w-md w-full p-6 space-y-6`}>
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
            {!isOnline ? (
              <WifiIcon className="w-8 h-8 text-orange-600" />
            ) : (
              <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
            )}
          </div>
          
          <div>
            <h2 className={`text-xl font-bold ${textPrimary}`}>
              {!isOnline ? 'Sem Conexão' : 'Problemas de Servidor'}
            </h2>
            <p className={`text-sm ${textSecondary} mt-1`}>
              {!isOnline 
                ? 'Verifique sua conexão com a internet'
                : 'Alguns serviços podem não estar funcionando'
              }
            </p>
          </div>
        </div>

        {/* Status da Conexão */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center space-x-3">
              <SignalIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className={`text-sm font-medium ${textPrimary}`}>Internet</span>
            </div>
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              )}
              <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                {isOnline ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </div>

          {/* Status dos Servidores */}
          <div className="space-y-2">
            {/* Servidor Node.js */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center space-x-3">
                <ServerIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className={`text-sm font-medium ${textPrimary}`}>Servidor Node.js</span>
              </div>
              <div className="flex items-center space-x-2">
                {isCheckingServers ? (
                  <ArrowPathIcon className="w-5 h-5 text-blue-500 animate-spin" />
                ) : (
                  getServerStatusIcon(nodeServerStatus)
                )}
                <span className={`text-sm font-medium ${getServerStatusColor(nodeServerStatus)}`}>
                  {isCheckingServers ? 'Verificando...' : getServerStatusText(nodeServerStatus)}
                </span>
              </div>
            </div>

            {/* Servidor Python */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center space-x-3">
                <ServerIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className={`text-sm font-medium ${textPrimary}`}>Servidor Python</span>
              </div>
              <div className="flex items-center space-x-2">
                {isCheckingServers ? (
                  <ArrowPathIcon className="w-5 h-5 text-blue-500 animate-spin" />
                ) : (
                  getServerStatusIcon(pythonServerStatus)
                )}
                <span className={`text-sm font-medium ${getServerStatusColor(pythonServerStatus)}`}>
                  {isCheckingServers ? 'Verificando...' : getServerStatusText(pythonServerStatus)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2">
          <button
            onClick={onRecheck}
            disabled={isCheckingServers}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium transition-colors duration-200`}
          >
            <ArrowPathIcon 
              className={`w-4 h-4 ${isCheckingServers ? 'animate-spin' : ''}`} 
            />
            <span>
              {isCheckingServers ? 'Verificando...' : 'Tentar Novamente'}
            </span>
          </button>
          
          <p className={`text-xs ${textSecondary} text-center`}>
            A verificação acontece automaticamente a cada 30 segundos
          </p>
        </div>

        {/* Tips */}
        {!isOnline && (
          <div className={`p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800`}>
            <p className={`text-sm text-yellow-800 dark:text-yellow-200`}>
              <strong>Dicas:</strong> Verifique sua conexão WiFi, dados móveis ou cabo de rede.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineScreen;