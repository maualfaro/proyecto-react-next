import { renderHook, act } from '@testing-library/react'
import { useTaskManager } from '../features/tasksManagement/hooks/useTaskManager'

test('agrega una tarea correctamente', () => {
  const { result } = renderHook(() => useTaskManager())

  act(() => {
    result.current.addTask('Nueva tarea')
  })

  expect(result.current.tasks.length).toBe(1)
})