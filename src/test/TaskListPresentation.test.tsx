import { render, screen } from '@testing-library/react'
import { TaskListPresentation } from '../features/tasksManagement/components/TaskListPresentation'

const mockProps = {
  tasks: [],
  newTask: '',
  error: '',
  touched: false,
  onChangeNewTask: jest.fn(),
  onBlurNewTask: jest.fn(),
  onAddTask: jest.fn(),
  onToggleTask: jest.fn(),
  filter: 'all' as const,
  setFilter: jest.fn(),
  search: '',
  setSearch: jest.fn(),
}

test('muestra mensaje cuando no hay tareas', () => {
  render(<TaskListPresentation {...mockProps} />)

  expect(screen.getByText(/No hay tareas aún/i)).toBeInTheDocument()
})