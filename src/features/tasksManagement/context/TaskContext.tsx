'use client'

import { createContext, useContext, ReactNode, useState } from 'react'
import { useTaskManager } from '../hooks/useTaskManager'
import type { Task } from '../types'

type TaskContextType = {
  tasks: Task[]
  addTask: (title: string, description: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void

  completedCount: number
  pendingTasks: Task[]
  totalTasks: number


  selectedTaskId: string | null
  setSelectedTaskId: (id: string | null) => void
}

const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children }: { children: ReactNode }) {
  const taskManager = useTaskManager()


  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  return (
    <TaskContext.Provider
      value={{
        ...taskManager,
        selectedTaskId,
        setSelectedTaskId,
      }}
    >
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