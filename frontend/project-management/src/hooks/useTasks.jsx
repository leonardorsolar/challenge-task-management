import React, { useState } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskData) => {
    const task = {
      id: taskData.id || Date.now().toString(),
      ...taskData,
      createdAt: taskData.createdAt || new Date().toISOString(),
    };

    setTasks((prev) => {
      const alreadyExists = prev.some((t) => t.id === task.id);
      return alreadyExists ? prev : [...prev, task];
    });
  };

  const setAllTasks = (taskList) => {
    // remove duplicatas por id
    const uniqueTasks = Array.from(
      new Map(taskList.map((t) => [t.id, t])).values()
    );
    setTasks(uniqueTasks);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask, setAllTasks };
};

export default useTasks;










// const initialTasks = [
//   {
//     id: '1',
//     title: 'Implementar autenticação de usuário',
//     description: 'Criar sistema de login e registro com validação',
//     status: 'pending',
//     priority: 'high',
//     dueDate: '2025-07-20',
//     createdAt: '2025-07-15T10:00:00Z'
//   },
//   {
//     id: '2',
//     title: 'Configurar banco de dados',
//     description: 'Configurar PostgreSQL e criar tabelas necessárias',
//     status: 'in_progress',
//     priority: 'high',
//     dueDate: '2025-07-18',
//     createdAt: '2025-07-14T14:30:00Z'
//   },
//   {
//     id: '3',
//     title: 'Criar documentação da API',
//     description: 'Documentar todos os endpoints da API REST',
//     status: 'completed',
//     priority: 'medium',
//     dueDate: '2025-07-16',
//     createdAt: '2025-07-13T09:15:00Z'
//   }
// ]