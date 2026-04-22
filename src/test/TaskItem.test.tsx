import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskProvider } from '@/features/tasksManagement/context/TaskContext'
import { TaskListContainer } from '@/features/tasksManagement/components/TaskListContainer'
jest.mock('@/shared/data/seedData.json', () => ({
  tasks: [],
}))


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

            <span>
              {task.completed ? 'Completada' : 'Pendiente'}
            </span>
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

  const completeButton = screen.getByText(/Completar/i)
  await userEvent.click(completeButton)

  expect(await screen.findByText('Completada')).toBeInTheDocument()
})