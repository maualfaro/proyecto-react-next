'use client'

import { useState } from 'react'
import { TaskListPresentation } from './TaskListPresentation'
import type { Task } from '../types'

export function TaskListContainer() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  console.log('render TaskListContainer', { tasks, newTask })

  const addTask = () => {
    if (!newTask.trim()) return

    const newItem: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    }

    setTasks([...tasks, newItem])
    setNewTask('')
  }

  const toggleTask = (id: string) => {
    const updated = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )

    setTasks(updated)
  }

  return (
    <TaskListPresentation
      tasks={tasks}
      newTask={newTask}
      onChangeNewTask={setNewTask}
      onAddTask={addTask}
      onToggleTask={toggleTask}
    />
  )
}