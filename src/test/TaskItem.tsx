import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskProvider } from '@/features/tasksManagement/context/TaskContext'
import { TaskListContainer } from '@/features/tasksManagement/components/TaskListContainer'

test('cambia badge a completada al hacer click', async () => {
  render(
    <TaskProvider>
      <TaskListContainer />
    </TaskProvider>
  )

  const input = screen.getByPlaceholderText(/Escribe una nueva tarea/i)
  const buttonAdd = screen.getByText(/Agregar/i)

  await userEvent.type(input, 'Nueva tarea')
  await userEvent.click(buttonAdd)

  // botón de completar
  const completeButton = screen.getByText(/Completar/i)
  await userEvent.click(completeButton)

  // ahora debería aparecer "Completada"
  expect(await screen.findByText('Completada')).toBeInTheDocument()
})
