'use client'

import { TicketCard } from './TicketCard'
import type { Ticket, TicketStatus } from '../types'

type Props = {
  title: string
  status: TicketStatus
  tickets: Ticket[]
  move: (id: string) => void
  moveBack: (id: string) => void
  deleteTicket: (id: string) => void
}

export function TicketColumn({
  title,
  status,
  tickets,
  move,
  moveBack,
  deleteTicket,
}: Props) {
  const filtered = tickets.filter((t) => t.status === status)

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 400,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
          {title}
        </h3>

        <span
          style={{
            backgroundColor: '#e5e7eb',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: 12,
            fontWeight: 600,
            color: '#6b7280',
          }}
        >
          {filtered.length}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          flex: 1,
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              padding: 20,
              textAlign: 'center',
              color: '#9ca3af',
              fontSize: 14,
              border: '1px dashed #e5e7eb',
              borderRadius: 8,
            }}
          >
            Sin tickets
          </div>
        ) : (
          filtered.map((t) => (
            <TicketCard
              key={t.id}
              ticket={t}
              move={move}
              moveBack={moveBack}
              deleteTicket={deleteTicket} 
            />
          ))
        )}
      </div>
    </div>
  )
}