// src/components/Task/__tests__/TaskForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import TaskForm from '../TaskForm'
import { describe, expect, it, vi } from 'vitest'

describe('TaskForm', () => {
  it('renderiza campo de título e envia formulário', async () => {
    const mockOnSubmit = vi.fn()
    const task = { title: 'Teste', description: '', status: 'pending', priority: 'medium', dueDate: '' }

    render(
      <TaskForm
        isOpen={true}
        task={task}
        onTaskChange={() => {}}
        onSubmit={mockOnSubmit}
        onCancel={() => {}}
        isEditing={false}
        isDarkMode={false}
      />
    )

    const submit = screen.getByRole('button', { name: /criar tarefa/i })
    fireEvent.click(submit)

    expect(mockOnSubmit).toHaveBeenCalled()
  })
})
