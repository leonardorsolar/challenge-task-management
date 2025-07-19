// pages/TaskManager.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import TaskControls from '../components/Task/TaskControls';
import TaskForm from '../components/Task/TaskForm';
import TaskStats from '../components/Task/TaskStats';
import TaskList from '../components/Task/TaskList';
import SidebarDesktop from '../components/Sidebar/SidebarDesktop';
import SidebarMobile from '../components/Sidebar/SidebarMobile';
import useTasks from '../hooks/useTasks';
import { toast } from 'react-toastify';
import api from '../services/api';
import ConfirmDeleteModal from '../components/Modal/ConfirmDeleteModal';

// Componente Principal TaskManager
const TaskManager = ({ isDarkMode, onToggleTheme, networkStatus }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  });

  const { tasks, addTask, updateTask, deleteTask, setAllTasks } = useTasks();

  const fetchTasks = async () => {
    // Só tenta buscar se estiver online e servidores disponíveis
    if (!networkStatus?.isOnline || !networkStatus?.allServersOnline) {
      return;
    }

    try {
      const queryParam = filter !== "all" ? `?status=${filter}` : "";
      const response = await api.get(`/task/list${queryParam}`);
      console.log('TaskManager - fetchTasks response:', response.data);
      setAllTasks(response.data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      toast.error("Falha ao carregar tarefas.");
    }
  };

  // Chamada à API para o READ
  useEffect(() => {
    fetchTasks();
  }, [networkStatus?.allServersOnline, filter]);
  
  // Debug: verificar se tasks está sendo passado
  console.log('TaskManager - tasks:', tasks);

  // Chamada à API para o CREATE
  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    if (!networkStatus?.allServersOnline) {
      toast.error('Não é possível criar tarefas sem conexão com os servidores.');
      return;
    }
  
    const payload = {
      ...newTask,
      userId: 'ext-123456' // Troque por ID real ou dinâmico
    };
  
    try {
      const response = await api.post('/task', payload);
      const createdTask = response.data;

      addTask(createdTask);
      fetchTasks();
  
      if (!createdTask) throw new Error('Erro ao criar tarefa');
  
      resetForm();
      toast.success('Tarefa criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      toast.error('Falha ao criar tarefa. Verifique sua conexão.');
    }
  };
  
  const handleEditTask = (task) => {
    if (!networkStatus?.allServersOnline) {
      toast.error('Não é possível editar tarefas sem conexão com os servidores.');
      return;
    }

    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
    });
  };

  const handleSaveEdit = async () => {
    if (!editingTask || !newTask.title.trim()) return;

    if (!networkStatus?.allServersOnline) {
      toast.error('Não é possível salvar alterações sem conexão com os servidores.');
      return;
    }
  
    const payload = {
      ...newTask,
      userId: editingTask.userId || 'ext-123456'
    };
  
    try {
      const response = await api.put(`/task/${editingTask.id}`, payload);
  
      const updated = response.data;
      updateTask(updated.id, updated);
      resetForm();
      toast.success('Tarefa editada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      toast.error('Falha ao editar tarefa. Verifique sua conexão.');
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const confirmDelete = (id) => {
    if (!networkStatus?.allServersOnline) {
      toast.error('Não é possível deletar tarefas sem conexão com os servidores.');
      return;
    }

    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (!networkStatus?.allServersOnline) {
      toast.error('Não é possível deletar tarefas sem conexão com os servidores.');
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
      return;
    }

    try {
      const response = await api.delete(`/task/${taskToDelete}`);
  
      if (response.status !== 204) throw new Error("Erro ao deletar");
  
      deleteTask(taskToDelete);
      toast.warning("Tarefa deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      toast.error("Erro ao deletar tarefa. Verifique sua conexão.");
    } finally {
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const resetForm = () => {
    setEditingTask(null);
    setIsAddingTask(false);
    setNewTask({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: ''
    });
  };

  // Definindo a chamada à API 
  const handleFormSubmit = () => {
    if (editingTask) {
      handleSaveEdit();
    } else {
      handleAddTask();
    }
  };

  const bgBase = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen ${bgBase} ${textPrimary} transition-colors duration-300`}>
      {/* Sidebar Desktop */}
      <SidebarDesktop 
        isDarkMode={isDarkMode}
        toggleTheme={onToggleTheme}
        filter={filter}
        onFilterChange={setFilter}
        onAddTask={() => setIsAddingTask(true)}
        onShowStats={() => setShowStats(true)}
        tasks={tasks}
        networkStatus={networkStatus}
      />

      {/* Main Content - com padding left apenas para desktop */}
      <div className="lg:pl-72">
        {/* Header */}
        <Header 
          isDarkMode={isDarkMode} 
          onToggleTheme={onToggleTheme}
          onOpenSidebar={() => setSidebarOpen(true)}
          networkStatus={networkStatus}
        />

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <TaskControls
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
            onAddTask={() => setIsAddingTask(true)}
            onShowStats={() => setShowStats(true)}
            isDarkMode={isDarkMode}
            networkStatus={networkStatus}
          />

          <TaskForm
            isOpen={isAddingTask || !!editingTask}
            task={newTask}
            onTaskChange={setNewTask}
            onSubmit={handleFormSubmit}
            onCancel={resetForm}
            isEditing={!!editingTask}
            isDarkMode={isDarkMode}
            networkStatus={networkStatus}
          />

          <TaskStats 
            tasks={tasks} 
            isDarkMode={isDarkMode}
            isOpen={showStats}
            onClose={() => setShowStats(false)}
          />

          <TaskList
            tasks={tasks}
            searchTerm={searchTerm}
            filter={filter}
            onEditTask={handleEditTask}
            onDeleteTask={confirmDelete}
            isDarkMode={isDarkMode}
            networkStatus={networkStatus}
          />
          
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            isDarkMode={isDarkMode}
          />
        </main>
      </div>

      {/* Sidebar Mobile */}
      <SidebarMobile
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDarkMode={isDarkMode}
        toggleTheme={onToggleTheme}
        filter={filter}
        onFilterChange={setFilter}
        onAddTask={() => setIsAddingTask(true)}
        onShowStats={() => setShowStats(true)}
        tasks={tasks}
        networkStatus={networkStatus}
      />
    </div>
  );
};

export default TaskManager;