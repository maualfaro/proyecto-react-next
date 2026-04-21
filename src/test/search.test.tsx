import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskProvider } from '@/features/tasksManagement/context/TaskContext'
import { TaskListContainer } from '@/features/tasksManagement/components/TaskListContainer'

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
          placeholder="Buscar tarea..."
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
        />

        <input
          placeholder="Escribe una nueva tarea..."
          value={props.newTask}
          onChange={(e) => props.onChangeNewTask(e.target.value)}
        />
        <button onClick={props.onAddTask}>Agregar</button>

        {props.tasks.length === 0 ? (
          <p>
            {props.search
              ? 'No se encontraron resultados'
              : 'No hay tareas aún'}
          </p>
        ) : (
          props.tasks.map((task: any) => (
            <p key={task.id}>{task.title}</p>
          ))
        )}
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

test('muestra mensaje cuando no hay resultados en búsqueda', async () => {
  render(
    <TaskProvider>
      <TaskListContainer />
    </TaskProvider>
  )

  const input = screen.getByPlaceholderText(/Escribe una nueva tarea/i)
  const addButton = screen.getByText(/Agregar/i)

  await userEvent.type(input, 'React')
  await userEvent.click(addButton)

  expect(screen.getByText('React')).toBeInTheDocument()

  const searchInput = screen.getByPlaceholderText(/Buscar tarea/i)
  await userEvent.type(searchInput, 'Angular')

  expect(
    await screen.findByText(/No se encontraron resultados/i)
  ).toBeInTheDocument()
})