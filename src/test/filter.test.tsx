import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskListContainer } from '@/features/tasksManagement/components/TaskListContainer'
import { TaskProvider } from '@/features/tasksManagement/context/TaskContext'


jest.mock('react', () => {
  const actual = jest.requireActual('react')

  return {
    ...actual,
    lazy: () => {
      return function MockedComponent(props: any) {
        return (
          <div>
            <input
              placeholder="Escribe una nueva tarea..."
              value={props.newTask}
              onChange={(e) => props.onChangeNewTask(e.target.value)}
            />
            <button onClick={props.onAddTask}>Agregar</button>

            {/* filtro */}
            <button onClick={() => props.setFilter('completed')}>
              Completadas
            </button>

            {/* lista */}
            {props.tasks.map((task: any) => (
              <div key={task.id}>
                <p>{task.title}</p>

                <button onClick={() => props.onToggleTask(task.id)}>
                  Completar
                </button>
              </div>
            ))}
          </div>
        )
      }
    },
  }
})

// mock async
jest.mock('@/shared/hooks', () => ({
  ...jest.requireActual('@/shared/hooks'),
  useAsync: () => ({
    data: [],
    loading: false,
    error: null,
  }),
}))

beforeAll(() => {
  window.confirm = jest.fn(() => true)
})

test('filtra tareas completadas', async () => {
  render(
    <TaskProvider>
      <TaskListContainer />
    </TaskProvider>
  )

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