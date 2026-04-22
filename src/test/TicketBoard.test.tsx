import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskListContainer } from '@/features/tasksManagement/components/TaskListContainer'
import { TaskProvider } from '@/features/tasksManagement/context/TaskContext'
import { TicketProvider } from '@/features/tickets/context/TicketContext'

jest.mock('@/shared/data/seedData.json', () => ({
  tasks: [],
}))
jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)
beforeEach(() => {
  localStorage.clear()
})

jest.mock('@/shared/hooks', () => ({
  ...jest.requireActual('@/shared/hooks'),
  useAsync: () => ({
    data: [],
    loading: false,
    error: null,
  }),
}))

const renderWithProviders = () =>
  render(
    <TaskProvider>
      <TicketProvider>
        <TaskListContainer />
      </TicketProvider>
    </TaskProvider>
  )

test('filtra tareas completadas', async () => {
  renderWithProviders()

  const input = screen.getByPlaceholderText(/Escribe una nueva tarea/i)
  const addButton = screen.getByText(/Agregar/i)

  await userEvent.type(input, 'Tarea 1')
  await userEvent.click(addButton)

  await userEvent.type(input, 'Tarea 2')
  await userEvent.click(addButton)

  const completeButtons = screen.getAllByText(/Completar/i)
  await userEvent.click(completeButtons[0])

  const filterButton = screen.getByText(/Completadas/i)
  await userEvent.click(filterButton)

  expect(screen.getByText('Tarea 1')).toBeInTheDocument()
  expect(screen.queryByText('Tarea 2')).not.toBeInTheDocument()
})