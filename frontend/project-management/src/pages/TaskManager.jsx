import React, { useState } from 'react'
import Header from '../components/Header/Header'
import TaskControls from '../components/Task/TaskControls'
import TaskForm from '../components/Task/TaskForm'
import TaskStats from '../components/Task/TaskStats'
import TaskList from '../components/Task/TaskList'
import useTasks from '../hooks/useTasks'

// Componente Principal TaskManager
const TaskManager = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [showStats, setShowStats] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  })

  const { tasks, addTask, updateTask, deleteTask } = useTasks()

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask(newTask)
      resetForm()
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
    })
  }

  const handleSaveEdit = () => {
    if (editingTask && newTask.title.trim()) {
      updateTask(editingTask.id, newTask)
      resetForm()
    }
  }

  const handleDeleteTask = (id) => {
    deleteTask(id)
  }

  const resetForm = () => {
    setEditingTask(null)
    setIsAddingTask(false)
    setNewTask({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: ''
    })
  }

  const handleFormSubmit = () => {
    if (editingTask) {
      handleSaveEdit()
    } else {
      handleAddTask()
    }
  }

  const bgBase = isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'

  return (
    <div className={`min-h-screen ${bgBase} ${textPrimary} transition-colors duration-300`}>
      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterChange={setFilter}
          onAddTask={() => setIsAddingTask(true)}
          onShowStats={() => setShowStats(true)}
          isDarkMode={isDarkMode}
        />

        <TaskForm
          isOpen={isAddingTask || !!editingTask}
          task={newTask}
          onTaskChange={setNewTask}
          onSubmit={handleFormSubmit}
          onCancel={resetForm}
          isEditing={!!editingTask}
          isDarkMode={isDarkMode}
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
          onDeleteTask={handleDeleteTask}
          isDarkMode={isDarkMode}
        />
      </main>
    </div>
  )
}

export default TaskManager;