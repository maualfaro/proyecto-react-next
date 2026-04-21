'use client'

import { useEffect } from 'react'
import seedData from '@/shared/data/seedData.json'

export function SeedDataLoader() {
  useEffect(() => {
    const hasData = localStorage.getItem('tasks')

    if (!hasData) {
      localStorage.setItem('tasks', JSON.stringify(seedData.tasks))
      localStorage.setItem('tickets', JSON.stringify(seedData.tickets))
    }
  }, [])

  return null
}