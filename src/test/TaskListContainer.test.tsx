import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskListContainer } from '../features/tasksManagement/components/TaskListContainer'
import { TaskProvider } from '../features/tasksManagement/context/TaskContext'

jest.mock('react', () => {
  const actual = jest.requireActual('react')
  return {
    ...actual,
    Suspense: ({ children }: any) => children,
  }
})

jest.mock('@/features/tasksManagement/components/TaskListPresentation', () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div>
        <input
          placeholder="Escribe una nueva tarea..."
          value={props.newTask}
          onChange={(e) => props.onChangeNewTask(e.target.value)}
        />
        <button onClick={props.onAddTask}>Agregar</button>

        {props.tasks?.map((task: any) => (
          <div key={task.id}>
            <p>{task.title}</p>

            <button onClick={() => props.onToggleTask(task.id)}>
              Completar
            </button>

            <button onClick={() => props.onDeleteTask(task.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    ),
  }
})

jest.mock('@/shared/hooks', () => ({
  ...jest.requireActual('@/shared/hooks'),
  useAsync: () => ({
    data: [],
    loading: false,
    error: null,
  }),
}))

beforeEach(() => {
  jest.spyOn(window, 'confirm').mockReturnValue(true)
})

test('permite agregar una tarea', async () => {
  render(
    <TaskProvider>
      <TaskListContainer />
    </TaskProvider>
  )

  const input = screen.getByPlaceholderText(/Escribe una nueva tarea/i)
  const button = screen.getByText(/Agregar/i)

  await userEvent.type(input, 'Mi tarea')
  await userEvent.click(button)

  expect(screen.getByText('Mi tarea')).toBeInTheDocument()
})

test('permite eliminar una tarea', async () => {
  render(
    <TaskProvider>
      <TaskListContainer />
    </TaskProvider>
  )

  const input = screen.getByPlaceholderText(/Escribe una nueva tarea/i)
  const addButton = screen.getByText(/Agregar/i)

  await userEvent.type(input, 'Tarea a eliminar')
  await userEvent.click(addButton)

  expect(screen.getByText('Tarea a eliminar')).toBeInTheDocument()

  // 🔥 seleccionar el item correcto
  const taskItem = screen.getByText('Tarea a eliminar').closest('div')!
  const deleteButton = within(taskItem).getByRole('button', { name: /Eliminar/i })

  await userEvent.click(deleteButton)

  await waitFor(() => {
    expect(screen.queryByText(/Tarea a eliminar/i)).not.toBeInTheDocument()
  })
})