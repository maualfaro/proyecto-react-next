import { useEffect, useState } from 'react'

type AsyncFunction<T> = () => Promise<T>

export function useAsync<T>(asyncFunction: AsyncFunction<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let isMounted = true 

    const run = async () => {
      try {
        setLoading(true)
        const result = await asyncFunction()

        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    run()

    return () => {
      isMounted = false
    }
  }, deps)

  return { data, loading, error }
}