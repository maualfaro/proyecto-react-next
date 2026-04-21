'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useTaskManager } from '../hooks/useTaskManager'
import type { Task } from '../types'


type TaskContextType = {
  tasks: Task[]
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  completedCount: number
  pendingTasks: Task[]
  totalTasks: number
}

const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children }: { children: ReactNode }) {
  const value = useTaskManager()

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks(): TaskContextType {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks debe usarse dentro de TaskProvider')
  }

  return context
}