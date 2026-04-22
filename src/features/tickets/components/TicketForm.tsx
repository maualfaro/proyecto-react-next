'use client'

import { useState } from 'react'
import { useTickets } from '../context/TicketContext'
import { useTasks } from '@/features/tasksManagement/context/TaskContext'
import { Input, Button } from '@/shared/ui/atoms'
import { useTicketStore } from '@/store/useTicketStore'

export function TicketForm() {
  const addTicket = useTicketStore(s => s.addTicket)
  const { selectedTaskId } = useTasks()

  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media')
  const [assignee, setAssignee] = useState('')
  const [label, setLabel] = useState('')

  const handleAdd = () => {
    if (!title.trim() || !selectedTaskId) return

    addTicket({
      id: crypto.randomUUID(),
      title,
      taskId: selectedTaskId,
      status: 'backlog',
      priority,
      assignee,
      label,
    })

    setTitle('')
    setAssignee('')
    setLabel('')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        padding: 16,
        width: '100%',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: 16,
          fontWeight: 600,
          color: '#111827',
        }}
      >
        Crear nuevo ticket
      </h3>

      <Input
        placeholder="Título del ticket"
        value={title}
        onChange={setTitle}
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value as any)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid #d1d5db',
          outline: 'none',
          fontSize: 14,
        }}
      >
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>

      <Input
        placeholder="Responsable"
        value={assignee}
        onChange={setAssignee}
      />

      <Input
        placeholder="Etiqueta"
        value={label}
        onChange={setLabel}
      />

      <Button onClick={handleAdd} label="Crear ticket" variant="primary" />
    </div>
  )
}