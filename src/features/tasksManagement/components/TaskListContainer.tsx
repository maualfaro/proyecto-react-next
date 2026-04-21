'use client'

import { useForm } from '@/shared/hooks'
import { useTasks } from '../context/TaskContext'
import { useAsync } from '@/shared/hooks'
import { useMemo, useState, useCallback } from 'react'
import { useDebounce } from '@/shared/hooks/useDebounce'
import React, { Suspense } from 'react'

let TaskListPresentation: any

if (process.env.NODE_ENV === 'test') {
  TaskListPresentation = require('./TaskListPresentation').default
} else {
  TaskListPresentation = React.lazy(() =>
    import('./TaskListPresentation')
  )
}

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
  } = useForm({ title: '', description: '' })

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
      { id: '1', title: 'Aprender React', description: '', completed: false },
      { id: '2', title: 'Practicar hooks', description: '', completed: true },
    ]
  }

  const { loading, error } = useAsync(fetchTasks, [])

  const validateTask = (values: { title: string; description: string }) => {
    const errors: { title?: string; description?: string } = {}

    if (!values.title.trim()) {
      errors.title = 'La tarea es requerida'
    }

    if (values.description.length > 100) {
      errors.description = 'Máximo 100 caracteres'
    }

    return errors
  }

  const handleChangeTask = useCallback(
    (value: string) => {
      handleChange('title', value)
    },
    [handleChange]
  )

  const handleChangeDescription = useCallback(
    (value: string) => {
      handleChange('description', value)
    },
    [handleChange]
  )

  const handleBlurTask = useCallback(() => {
    handleBlur('title')
  }, [handleBlur])

  const handleBlurDescription = useCallback(() => {
    handleBlur('description')
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
    handleBlur('description')

    const validationErrors = validate(validateTask)

    if (Object.keys(validationErrors).length > 0) return

    addTask(values.title, values.description)
    reset()
  }, [
    handleBlur,
    validate,
    addTask,
    values.title,
    values.description,
    reset,
  ])

  // ⏳ estados async
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
        description={values.description}
        error={errors.title}
        onChangeNewTask={handleChangeTask}
        onBlurNewTask={handleBlurTask}
        onChangeDescription={handleChangeDescription}
        onBlurDescription={handleBlurDescription}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        titleError={errors.title}
        descriptionError={errors.description}
        touched={touched.title || touched.description}
      />
    </Suspense>
  )
}