'use client'

import { useReducer, useEffect } from 'react'
import { taskReducer, initialState } from '../state/taskReducer'
import type { Task } from '../types'
import seedData from '@/shared/data/seedData.json'


const getInitialTasks = (): Task[] => {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('tasks')

    if (stored) return JSON.parse(stored)

    localStorage.setItem('tasks', JSON.stringify(seedData.tasks))
    return seedData.tasks
  } catch {
    return []
  }
}

export function useTaskManager() {
  const [state, dispatch] = useReducer(taskReducer, {
    ...initialState,
    tasks: getInitialTasks(), 
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  }, [state.tasks])

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    }

    dispatch({ type: 'ADD_TASK', payload: newTask })
}

  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id })
  }

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  const completedCount = state.tasks.filter(t => t.completed).length
  const pendingTasks = state.tasks.filter(t => !t.completed)
  const totalTasks = state.tasks.length

  return {
    tasks: state.tasks,
    addTask,
    toggleTask,
    deleteTask,
    completedCount,
    pendingTasks,
    totalTasks,
  }
}