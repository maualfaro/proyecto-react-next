import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/shared/hooks/useDebounce'

jest.useFakeTimers()

test('retorna valor después del delay', () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 300),
    { initialProps: { value: 'hola' } }
  )

  expect(result.current).toBe('hola')

  rerender({ value: 'hola mundo' })

  expect(result.current).toBe('hola')

  act(() => {
    jest.advanceTimersByTime(300)
  })
  expect(result.current).toBe('hola mundo')
})