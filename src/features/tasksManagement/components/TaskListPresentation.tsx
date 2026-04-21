import type { Task } from '../types'
import { Input, Button } from '@/shared/ui/atoms'
import React from 'react'
import { TaskItem } from './TaskItem'

type Filter = 'all' | 'completed' | 'pending'

type Props = {
  tasks: Task[]
  newTask: string
  error?: string
  touched?: boolean
  onChangeNewTask: (value: string) => void
  onBlurNewTask: () => void
  onAddTask: () => void
  onToggleTask: (id: string) => void
  search: string
  setSearch: (value: string) => void
  filter: Filter
  setFilter: (value: Filter) => void
}

export const TaskListPresentation = React.memo(function TaskListPresentation({
  tasks,
  newTask,
  error,
  touched,
  onChangeNewTask,
  onBlurNewTask,
  onAddTask,
  onToggleTask,
  filter,
  setFilter,
  search,
  setSearch,
}: Props) {
  console.log('render TaskListPresentation')

  return (
    <div
      style={{
        maxWidth: 520,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Input
        value={search}
        onChange={setSearch}
        placeholder="Buscar tarea..."
      />

      <div
        style={{
          display: 'flex',
          gap: 10,
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1 }}>
          <Input
            value={newTask}
            onChange={onChangeNewTask}
            onBlur={onBlurNewTask}
            placeholder="Escribe una nueva tarea..."
          />

          {touched && error && (
            <p
              style={{
                color: '#ef4444',
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {error}
            </p>
          )}
        </div>

        <div style={{ flexShrink: 0 }}>
          <Button label="Agregar" onClick={onAddTask} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          label="Todas"
          onClick={() => setFilter('all')}
        />
        <Button
          label="Completadas"
          onClick={() => setFilter('completed')}
        />
        <Button
          label="Pendientes"
          onClick={() => setFilter('pending')}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {tasks.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: '#9ca3af',
              fontSize: 14,
              padding: 20,
              border: '1px dashed #e5e7eb',
              borderRadius: 12,
            }}
          >
            {search
              ? 'No se encontraron resultados'
              : 'No hay tareas aún'}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
            />
          ))
        )}
      </div>
    </div>
  )
})