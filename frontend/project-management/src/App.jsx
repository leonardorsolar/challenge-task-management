// App.js
import './styles/tailwind.css';
import TaskManager from './pages/TaskManager';
import OfflineScreen from './components/Network/OfflineScreen';
import useNetworkStatus from './hooks/useNetworkStatus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const {
    isOnline,
    nodeServerStatus,
    pythonServerStatus,
    isCheckingServers,
    recheckServers,
    allServersOnline,
    hasServerIssues
  } = useNetworkStatus();

  // Sincronizar tema com localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Determina se deve mostrar a tela offline
  const shouldShowOfflineScreen = !isOnline || hasServerIssues;

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        theme={isDarkMode ? 'dark' : 'light'}
      />
      
      {/* Tela Offline - sobrepõe tudo quando necessário */}
      {shouldShowOfflineScreen && (
        <OfflineScreen
          isOnline={isOnline}
          nodeServerStatus={nodeServerStatus}
          pythonServerStatus={pythonServerStatus}
          isCheckingServers={isCheckingServers}
          onRecheck={recheckServers}
          isDarkMode={isDarkMode}
        />
      )}
      
      {/* App Principal */}
      <TaskManager 
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        networkStatus={{
          isOnline,
          nodeServerStatus,
          pythonServerStatus,
          allServersOnline
        }}
      />
    </div>
  );
}

export default App;