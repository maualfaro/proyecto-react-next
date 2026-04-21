import { useMemo } from 'react'
import type { Task } from '@/features/tasksManagement/types'

type Filter = 'all' | 'completed' | 'pending'

export function useFilter(tasks: Task[], filter: Filter, search: string) {
  return useMemo(() => {
    let result = tasks

    if (filter === 'completed') {
      result = result.filter(t => t.completed)
    }

    if (filter === 'pending') {
      result = result.filter(t => !t.completed)
    }

    if (search.trim()) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    return result
  }, [tasks, filter, search])
}