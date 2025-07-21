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
import AISuggestionModal from '../components/ModalIA/AISuggestionModal';
import ProjectConfigModal from '../components/Modal/ProjectConfigModal'; // Novo import
import apiGithub from '../services/apiGithub';
import apiIA from '../services/apiIA';

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

  // Novos estados para IA
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [selectedTaskForAI, setSelectedTaskForAI] = useState(null);

  // Novos estados para configurações do projeto
  const [showProjectConfig, setShowProjectConfig] = useState(false);
  const [projectConfig, setProjectConfig] = useState({
    projectName: '',
    objective: '',
    projectType: 'fullstack',
    programmingLanguage: '',
    architecture: '',
    frontendFramework: '',
    backendFramework: '',
    database: ''
  });

  const { tasks, addTask, updateTask, deleteTask, setAllTasks } = useTasks();

  // Carregar configurações do projeto do localStorage na inicialização
  useEffect(() => {
    const savedConfig = localStorage.getItem('projectConfig');
    if (savedConfig) {
      try {
        setProjectConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Erro ao carregar configurações do projeto:', error);
      }
    }
  }, []);

  const fetchTasks = async () => {
    // Só tenta buscar se estiver online e servidores disponíveis
    if (!networkStatus?.isOnline || !networkStatus?.allServersOnline) {
      return;
    }

    try {
      const queryParam = filter !== "all" ? `?status=${filter}` : "";
      const response = await api.get(`/task/list${queryParam}`);
      //console.log('TaskManager - fetchTasks response:', response.data);
      //setAllTasks(response.data);

    const responseIa = await apiIA.get(`/message/list`);
    //console.log(responseIa)

    const tasks = response.data;
    //console.log(tasks)
    const iaArray = responseIa.data;
    //console.log(iaArray)
    

    // Transforma array em objeto indexado por id
    const iaMap = iaArray.reduce((acc, msg) => {
      acc[msg.id] = msg;
      return acc;
    }, {});

    // Filtra e adiciona generateAIResponse apenas se houver correspondência
    const tasksWithIA = tasks
      .filter(task => !!iaMap[task.id])
      .map(task => ({
        ...task,
        generateAIResponse: iaMap[task.id]?.generateAIResponse || null,
      }));

    console.log("🔍 Tarefas com IA:", tasksWithIA);

    setAllTasks(tasksWithIA);


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
  //console.log('TaskManager - tasks:', tasks);

  // Função melhorada para chamar a API da IA com configurações do projeto
  const callAISuggestion = async (taskData, id, userId) => {
    try {
      
      // Criar contexto enriquecido com as configurações do projeto
      // id é a referencia da tabela task
      const enhancedPrompt = {
        task: {
          id: id,
          userId: userId,
          title: taskData.title,
          description: taskData.description,
          currentStatus: taskData.status,
          currentPriority: taskData.priority
        },
        projectContext: {
          name: projectConfig.projectName,
          objective: projectConfig.objective,
          type: projectConfig.projectType,
          programmingLanguage: projectConfig.programmingLanguage,
          architecture: projectConfig.architecture,
          frontendFramework: projectConfig.frontendFramework,
          backendFramework: projectConfig.backendFramework,
          database: projectConfig.database
        }
      };

      const aiResponse = await apiIA.post('/message/ai-suggestion', enhancedPrompt);
      //console.log('******************');
      //console.log('Resposta da IA:', aiResponse.data);
      return {
        ...aiResponse.data,
        generatedAt: new Date().toISOString()
      };

    
    } catch (error) {
      console.error('Erro ao chamar API da IA:', error);
      toast.warning('Não foi possível gerar sugestões da IA, mas a tarefa foi criada com sucesso.');
      return null;
    }
  };

  // Função para salvar configurações do projeto
  const handleSaveProjectConfig = (newConfig) => {
    setProjectConfig(newConfig);
    // Salvar no localStorage
    localStorage.setItem('projectConfig', JSON.stringify(newConfig));
    toast.success('Configurações do projeto salvas com sucesso!');
    //console.log('Configurações salvas:', newConfig);
  };

  //função auxiliar no frontend que chama o endpoint mcp
  const createGithubIssue = async (task) => {
    try {
      await apiGithub.post('/issue', {
        command: "CREATE_TASK",
        payload: {
          title: task.title,
          description: task.description,
        },
      });
      toast.info('✅ Issue criada no GitHub!');
    } catch (error) {
      console.error('❌ Erro ao criar issue no GitHub:', error);
      toast.error('Erro ao criar issue no GitHub');
    }
  };
  
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
      
      
      //console.log("createdTask")
      //console.log(createdTask)
  
      if (!createdTask) throw new Error('Erro ao criar tarefa');
  
      addTask(createdTask);
      
      resetForm();
      toast.success('Tarefa criada com sucesso!');

       // Cria uma issue no GitHub relacionada
      //await createGithubIssue(createdTask);
  
      // 3. Roda a IA em segundo plano com contexto do projeto
      const aiResponseData = await callAISuggestion(payload, createdTask.id, createdTask.userId);
      //console.log("aiResponseData")
      //console.log(aiResponseData)
      //console.log(aiResponseData._value.aiResponse)
  
      if (aiResponseData?.isSuccess) {
        setSelectedTaskForAI({
          ...createdTask,
          title: createdTask.title,
          aiSuggestion: {
            reasoning: aiResponseData._value.aiResponse,
            generatedAt: new Date().toISOString()
          }
          
        });
        fetchTasks();
        //setShowAISuggestion(true);
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      toast.error('Erro ao adicionar tarefa');
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
  }

  // Função para visualizar sugestões da IA
  const handleViewAISuggestion = (task) => {
    //console.log("✅ handleViewAISuggestion chamada", task);
  setSelectedTaskForAI(task);
  setShowAISuggestion(true);
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
        onShowProjectConfig={() => setShowProjectConfig(true)} // Nova prop
        tasks={tasks}
        networkStatus={networkStatus}
        projectConfig={projectConfig} // Passar configurações para mostrar status
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
            onShowProjectConfig={() => setShowProjectConfig(true)} // Nova prop
            isDarkMode={isDarkMode}
            networkStatus={networkStatus}
            projectConfig={projectConfig} // Passar configurações
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
            onViewAISuggestion={handleViewAISuggestion}
          />
          
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            isDarkMode={isDarkMode}
          />

          <AISuggestionModal
            isOpen={showAISuggestion}
            task={selectedTaskForAI}
            onClose={() => {
              setShowAISuggestion(false);
              setSelectedTaskForAI(null);
            }}
            isDarkMode={isDarkMode}
          />

          {/* Novo Modal de Configurações do Projeto */}
          <ProjectConfigModal
            isOpen={showProjectConfig}
            onClose={() => setShowProjectConfig(false)}
            isDarkMode={isDarkMode}
            projectConfig={projectConfig}
            onSaveConfig={handleSaveProjectConfig}
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
        onShowProjectConfig={() => setShowProjectConfig(true)} // Nova prop
        tasks={tasks}
        networkStatus={networkStatus}
        projectConfig={projectConfig} // Passar configurações
      />
    </div>
  );
};

export default TaskManager;