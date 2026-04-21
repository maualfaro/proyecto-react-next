'use client'

import type { Ticket } from '../types'

type Props = {
  ticket: Ticket
  move: (id: string) => void
  moveBack: (id: string) => void
  deleteTicket: (id: string) => void
}

const priorityLabels: Record<string, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
}

const priorityColors: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
}

export function TicketCard({
  ticket,
  move,
  moveBack,
  deleteTicket,
}: Props) {
  const handleDelete = () => {
    if (!confirm('¿Eliminar este ticket?')) return
    deleteTicket(ticket.id)
  }

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 12,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <h4 style={{ margin: 0 }}>{ticket.title}</h4>

      <span
        style={{
          background: priorityColors[ticket.priority],
          color: 'white',
          padding: '2px 8px',
          borderRadius: 6,
          fontSize: 12,
          width: 'fit-content',
        }}
      >
        {priorityLabels[ticket.priority]}
      </span>

      <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
        Responsable: {ticket.assignee || 'Sin asignar'}
      </p>

      {ticket.label && (
        <span
          style={{
            background: '#e5e7eb',
            color: '#374151',
            padding: '2px 8px',
            borderRadius: 6,
            fontSize: 12,
            width: 'fit-content',
          }}
        >
          #{ticket.label}
        </span>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button
          onClick={() => moveBack(ticket.id)}
          style={{
            padding: '6px 10px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          ←
        </button>

        <button
          onClick={() => move(ticket.id)}
          style={{
            padding: '6px 10px',
            borderRadius: 8,
            border: '1px solid #2563eb',
            background: '#2563eb',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          →
        </button>

        <button
          onClick={handleDelete}
          style={{
            marginLeft: 'auto',
            padding: '6px 10px',
            borderRadius: 8,
            border: '1px solid #ef4444',
            background: '#fff',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}