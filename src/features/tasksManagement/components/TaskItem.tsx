import React from 'react'
import type { Task } from '../types'
import { Card } from '@/shared/ui/molecules'
import { Button, Badge } from '@/shared/ui/atoms'

type Props = {
  task: Task
  onToggle: (id: string) => void
}

export const TaskItem = React.memo(function TaskItem({ task, onToggle }: Props) {
  console.log('render TaskItem', task.id)

  return (
    <Card
      title={task.title}
      footer={
        <Button
          label={task.completed ? 'Reabrir' : 'Completar'}
          variant={task.completed ? 'danger' : 'primary'}
          onClick={() => onToggle(task.id)}
        />
      }
    >
      <Badge
        text={task.completed ? 'Completada' : 'Pendiente'}
        variant={task.completed ? 'success' : 'warning'}
      />
    </Card>
  )
})