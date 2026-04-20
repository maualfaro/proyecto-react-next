import { useEffect, useState } from 'react'

type AsyncFunction<T> = (signal: AbortSignal) => Promise<T>

export function useAsync<T>(
  asyncFunction: AsyncFunction<T>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const controller = new AbortController()

    const run = async () => {
      try {
        setLoading(true)

        const result = await asyncFunction(controller.signal)

        setData(result)
        setError(null)
      } catch (err: any) {
        if (err.name === 'AbortError') return

        setError(err)
      } finally {
        setLoading(false)
      }
    }

    run()
    return () => {
      controller.abort()
    }
  }, deps)

  return { data, loading, error }
}