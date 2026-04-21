import React from 'react'
import type { Task } from '../types'
import { Card } from '@/shared/ui/molecules'
import { Button, Badge } from '@/shared/ui/atoms'
import { useTasks } from '../context/TaskContext'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TaskItem = React.memo(function TaskItem({
  task,
  onToggle,
  onDelete,
}: Props) {
  const { setSelectedTaskId } = useTasks()

  return (
    <Card
      title={task.title}
      footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            label={task.completed ? 'Reabrir' : 'Completar'}
            variant={task.completed ? 'danger' : 'primary'}
            onClick={() => onToggle(task.id)}
          />

          <Button
            label="Eliminar"
            variant="danger"
            onClick={() => onDelete(task.id)}
          />

          <Button
            label="Ver tickets"
            variant="primary"
            onClick={() => setSelectedTaskId(task.id)}
          />
        </div>
      }
    >
      {task.description && (
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          {task.description}
        </p>
      )}

      <Badge
        text={task.completed ? 'Completada' : 'Pendiente'}
        variant={task.completed ? 'success' : 'warning'}
      />
    </Card>
  )
})