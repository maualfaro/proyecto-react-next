'use client'

import { ReactNode } from 'react'
import { TaskProvider } from '@/features/tasksManagement/context/TaskContext'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <TaskProvider>
      {children}
    </TaskProvider>
  )
}