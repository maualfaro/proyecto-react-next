'use client'

import { useReducer } from 'react'
import { taskReducer, initialState } from '../state/taskReducer'
import type { Task } from '../types'

export function useTaskManager() {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  const addTask = (title: string) => {
    if (!title.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title,
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