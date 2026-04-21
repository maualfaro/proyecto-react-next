import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/shared/hooks/useDebounce'


jest.useFakeTimers()

test('debounce retrasa el valor', () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 300),
    {
      initialProps: { value: '' },
    }
  )
  rerender({ value: 'React' })

  expect(result.current).toBe('')

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(result.current).toBe('React')
})