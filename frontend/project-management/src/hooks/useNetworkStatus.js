// hooks/useNetworkStatus.js
import { useState, useEffect } from "react";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [nodeServerStatus, setNodeServerStatus] = useState(null); // null, true, false
  const [pythonServerStatus, setPythonServerStatus] = useState(null); // null, true, false
  const [isCheckingServers, setIsCheckingServers] = useState(false);

  // Configurações dos servidores - funciona com Vite e Create React App
  const getEnvVar = (name, fallback) => {
    // Tenta Vite primeiro (import.meta.env), depois Create React App (process.env)
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return import.meta.env[`VITE_${name}`] || fallback;
    }
    // Para Create React App ou outros bundlers
    if (typeof process !== "undefined" && process.env) {
      return process.env[`REACT_APP_${name}`] || fallback;
    }
    return fallback;
  };

  const NODE_SERVER_URL = getEnvVar("NODE_SERVER_URL", "http://localhost:3000");
  const PYTHON_SERVER_URL = getEnvVar("PYTHON_SERVER_URL", "http://localhost:8000");

  const CHECK_INTERVAL = 30000; // 30 segundos

  // Monitora o status da conexão com a internet
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Função para verificar o status de um servidor
  const checkServerStatus = async (url, timeout = 5000) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${url}/health`, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.warn(`Servidor ${url} não está respondendo:`, error.message);
      return false;
    }
  };

  // Função para verificar todos os servidores
  const checkAllServers = async () => {
    if (!isOnline) {
      setNodeServerStatus(false);
      setPythonServerStatus(false);
      return;
    }

    setIsCheckingServers(true);

    try {
      const [nodeStatus, pythonStatus] = await Promise.all([checkServerStatus(NODE_SERVER_URL), checkServerStatus(PYTHON_SERVER_URL)]);

      setNodeServerStatus(nodeStatus);
      setPythonServerStatus(pythonStatus);
    } catch (error) {
      console.error("Erro ao verificar servidores:", error);
      setNodeServerStatus(false);
      setPythonServerStatus(false);
    } finally {
      setIsCheckingServers(false);
    }
  };

  // Efeito para verificar servidores periodicamente
  useEffect(() => {
    // Verifica imediatamente
    checkAllServers();

    // Configura intervalo para verificações periódicas
    const interval = setInterval(checkAllServers, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [isOnline]);

  // Função manual para recheck
  const recheckServers = () => {
    checkAllServers();
  };

  return {
    isOnline,
    nodeServerStatus,
    pythonServerStatus,
    isCheckingServers,
    recheckServers,
    allServersOnline: nodeServerStatus && pythonServerStatus,
    hasServerIssues: nodeServerStatus === false || pythonServerStatus === false,
  };
};

export default useNetworkStatus;
