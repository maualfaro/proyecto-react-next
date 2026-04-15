import type { Task } from '../types'
import { Card } from '@/shared/ui/molecules'
import { Button, Input, Badge } from '@/shared/ui/atoms'

console.log({ Card, Button, Input, Badge })

type Props = {
  tasks: Task[]
  newTask: string
  onChangeNewTask: (value: string) => void
  onAddTask: () => void
  onToggleTask: (id: string) => void
}

export function TaskListPresentation({
  tasks,
  newTask,
  onChangeNewTask,
  onAddTask,
  onToggleTask,
}: Props) {
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
      <div
        style={{
          display: 'flex',
          gap: 10,
          width: '100%',
          alignItems: 'stretch',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ flex: 1 }}>
        <Input
          value={newTask}
          onChange={onChangeNewTask}
          placeholder="Escribe una nueva tarea..."
        />
      </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <Button label="Agregar" onClick={onAddTask} />
        </div>
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
            No hay tareas aún
          </div>
        ) : (
          tasks.map((task) => (
            <Card
              key={task.id}
              title={task.title}
              footer={
                <Button
                  label={task.completed ? 'Reabrir' : 'Completar'}
                  variant={task.completed ? 'danger' : 'primary'}
                  onClick={() => onToggleTask(task.id)}
                />
              }
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Badge
                  text={task.completed ? 'Completada' : 'Pendiente'}
                  variant={task.completed ? 'success' : 'warning'}
                />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}