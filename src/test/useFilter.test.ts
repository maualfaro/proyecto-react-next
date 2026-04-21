import { renderHook } from '@testing-library/react'
import { useFilter } from '@/shared/hooks/useFilter'

const mockTasks = [
  { id: '1', title: 'React', completed: false },
  { id: '2', title: 'Hooks', completed: true },
  { id: '3', title: 'Testing', completed: false },
]

test('filtra tareas completadas', () => {
  const { result } = renderHook(() =>
    useFilter(mockTasks, 'completed', '')
  )

  expect(result.current.length).toBe(1)
  expect(result.current[0].title).toBe('Hooks')
})

test('filtra por búsqueda', () => {
  const { result } = renderHook(() =>
    useFilter(mockTasks, 'all', 'react')
  )

  expect(result.current.length).toBe(1)
  expect(result.current[0].title).toBe('React')
})

test('combina filtro y búsqueda', () => {
  const { result } = renderHook(() =>
    useFilter(mockTasks, 'pending', 'test')
  )

  expect(result.current.length).toBe(1)
  expect(result.current[0].title).toBe('Testing')
})