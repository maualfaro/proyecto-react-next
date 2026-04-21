'use client'

import { useForm } from '@/shared/hooks'
import { useTasks } from '../context/TaskContext'
import { useAsync } from '@/shared/hooks'
import { useMemo, useState, useCallback } from 'react'
import { useDebounce } from '@/shared/hooks/useDebounce'
import React, { Suspense } from 'react'

// 🔥 CORREGIDO (sin espacio)
const TaskListPresentation = React.lazy(
  () => import('./TaskListPresentation')
)

export function TaskListContainer() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
  } = useForm({ title: '' })

  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')

  const filteredTasks = useMemo(() => {
    console.log('recalculando filtro + búsqueda...')

    let result = tasks

    if (filter === 'completed') {
      result = result.filter(t => t.completed)
    }

    if (filter === 'pending') {
      result = result.filter(t => !t.completed)
    }

    if (debouncedSearch.trim()) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    return result
  }, [tasks, filter, debouncedSearch])

  const fetchTasks = async (signal: AbortSignal) => {
    await new Promise((res) => setTimeout(res, 2000))

    return [
      { id: '1', title: 'Aprender React', completed: false },
      { id: '2', title: 'Practicar hooks', completed: true },
    ]
  }

  const { loading, error } = useAsync(fetchTasks, [])

  const validateTask = (values: { title: string }) => {
    const errors: { title?: string } = {}

    if (!values.title.trim()) {
      errors.title = 'La tarea es requerida'
    }

    return errors
  }

  const handleChangeTask = useCallback(
    (value: string) => {
      handleChange('title', value)
    },
    [handleChange]
  )

  const handleBlurTask = useCallback(() => {
    handleBlur('title')
  }, [handleBlur])

  const handleToggleTask = useCallback(
    (id: string) => {
      toggleTask(id)
    },
    [toggleTask]
  )

  const handleDeleteTask = useCallback(
    (id: string) => {
      if (!confirm('¿Eliminar tarea?')) return
      deleteTask(id)
    },
    [deleteTask]
  )

  const handleAddTask = useCallback(() => {
    handleBlur('title')

    const validationErrors = validate(validateTask)

    if (Object.keys(validationErrors).length > 0) return

    addTask(values.title)
    reset()
  }, [handleBlur, validate, addTask, values.title, reset])

  if (loading) return <p>Cargando tareas...</p>
  if (error) return <p>Error al cargar tareas</p>

  return (
    <Suspense fallback={<p>Cargando UI...</p>}>
      <TaskListPresentation
        tasks={filteredTasks}
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        newTask={values.title}
        error={errors.title}
        touched={touched.title}
        onChangeNewTask={handleChangeTask}
        onBlurNewTask={handleBlurTask}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </Suspense>
  )
}