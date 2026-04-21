import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskListContainer } from '../features/tasksManagement/components/TaskListContainer'

jest.mock('@/shared/hooks', () => ({
  ...jest.requireActual('@/shared/hooks'),
  useAsync: () => ({
    data: [],
    loading: false,
    error: null,
  }),
}))

test('permite agregar una tarea', async () => {
  render(
    <TaskListContainer />
  )

  const input = screen.getByPlaceholderText(/Escribe una nueva tarea/i)
  const button = screen.getByText(/Agregar/i)

  await userEvent.type(input, 'Mi tarea')
  await userEvent.click(button)

  expect(screen.getByText('Mi tarea')).toBeInTheDocument()
})