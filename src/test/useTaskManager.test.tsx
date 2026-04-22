import { renderHook, act } from '@testing-library/react'
import { useTaskManager } from '../features/tasksManagement/hooks/useTaskManager'

jest.mock('@/shared/data/seedData.json', () => ({
  tasks: [],
}))
beforeEach(() => {
  localStorage.clear()
  jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)
})

test('agrega una tarea correctamente', () => {
  const { result } = renderHook(() => useTaskManager())

  act(() => {
    result.current.addTask('Nueva tarea', 'descripcion de la tarea')
  })

  expect(result.current.tasks.length).toBe(1)
})