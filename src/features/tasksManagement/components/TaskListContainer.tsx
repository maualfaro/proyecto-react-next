'use client'

import { TaskListPresentation } from './TaskListPresentation'
import { useForm } from '@/shared/hooks'
import { useTasks } from '../context/TaskContext'
import { useAsync } from '@/shared/hooks'

// Client Component — usa custom hook
export function TaskListContainer() {
  const { tasks, addTask, toggleTask } = useTasks()

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
  } = useForm({ title: '' })

  const fetchTasks = async () => {
  await new Promise((res) => setTimeout(res, 2000))

  return [
    { id: '1', title: 'Aprender React', completed: false },
    { id: '2', title: 'Practicar hooks', completed: true },
    ]
  }
  const { data, loading, error } = useAsync(fetchTasks, [])

  const validateTask = (values: { title: string }) => {
    const errors: { title?: string } = {}

    if (!values.title.trim()) {
      errors.title = 'La tarea es requerida'
    }

    return errors
  }

  const handleAddTask = () => {
  handleBlur('title') 

  const validationErrors = validate(validateTask)

  if (Object.keys(validationErrors).length > 0) return

  addTask(values.title)
  reset()
}
  if (loading) return <p>Cargando tareas...</p>

  if (error) return <p>Error al cargar tareas</p>

  return (
    <TaskListPresentation
      tasks={tasks}
      newTask={values.title}
      error={errors.title}
      touched={touched.title}
      onChangeNewTask={(value) => handleChange('title', value)}
      onBlurNewTask={() => handleBlur('title')}
      onAddTask={handleAddTask}
      onToggleTask={toggleTask}
    />
  )
}