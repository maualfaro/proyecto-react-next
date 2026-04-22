'use client'

import React, { createContext, useContext, useMemo } from 'react'
import { useTicketStore } from '@/store/useTicketStore'
import { useTasks } from '@/features/tasksManagement/context/TaskContext'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { Input } from '@/shared/ui/atoms'
import { TicketForm } from './TicketForm'
import { TicketCard } from './TicketCard'
import type { Ticket } from '../types'

type TicketBoardContextType = {
  tickets: Ticket[]
  moveTicket: (id: string) => void
  moveTicketBack: (id: string) => void
  deleteTicket: (id: string) => void
}

const TicketBoardContext = createContext<TicketBoardContextType | null>(null)

function useTicketBoard() {
  const ctx = useContext(TicketBoardContext)
  if (!ctx) throw new Error('TicketBoard compound fuera de contexto')
  return ctx
}

type ColumnProps = {
  title: string
  status: string
}

function Column({ title, status }: ColumnProps) {
  const { tickets, moveTicket, moveTicketBack, deleteTicket } = useTicketBoard()

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
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{title}</h3>
        <span>{filtered.length}</span>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: '#9ca3af' }}>Sin tickets</p>
      ) : (
        filtered.map((t) => (
          <TicketCard
            key={t.id}
            ticket={t}
            move={moveTicket}
            moveBack={moveTicketBack}
            deleteTicket={deleteTicket}
          />
        ))
      )}
    </div>
  )
}

type TicketBoardComponent = React.FC & {
  Column: typeof Column
}

export const TicketBoard: TicketBoardComponent = () => {
  const tickets = useTicketStore((s) => s.tickets)
  const moveTicket = useTicketStore((s) => s.moveTicket)
  const moveTicketBack = useTicketStore((s) => s.moveTicketBack)
  const deleteTicket = useTicketStore((s) => s.deleteTicket)

  const search = useTicketStore((s) => s.search)
  const setSearch = useTicketStore((s) => s.setSearch)

  const priorityFilter = useTicketStore((s) => s.priorityFilter)
  const assigneeFilter = useTicketStore((s) => s.assigneeFilter)

  const { selectedTaskId, tasks } = useTasks()

  const currentTask = tasks.find((t) => t.id === selectedTaskId)

  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    return tickets
      .filter((t) =>
        selectedTaskId ? t.taskId === selectedTaskId : true
      )
      .filter((t) =>
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .filter((t =>
        priorityFilter ? t.priority === priorityFilter : true
      ))
      .filter((t =>
        assigneeFilter
          ? t.assignee.toLowerCase().includes(assigneeFilter.toLowerCase())
          : true
      ))
  }, [tickets, selectedTaskId, debouncedSearch, priorityFilter, assigneeFilter])

  return (
    <TicketBoardContext.Provider
      value={{ tickets: filtered, moveTicket, moveTicketBack, deleteTicket }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2>
          {selectedTaskId
            ? `Tickets de: ${currentTask?.title}`
            : 'Selecciona una tarea para ver sus tickets'}
        </h2>

        <TicketForm />

        <Input
          placeholder="Buscar ticket..."
          value={search}
          onChange={setSearch}
        />

        <div style={{ display: 'flex', gap: 16 }}>
          <TicketBoard.Column title="Backlog" status="backlog" />
          <TicketBoard.Column title="En progreso" status="in_progress" />
          <TicketBoard.Column title="En revisión" status="review" />
          <TicketBoard.Column title="Completado" status="done" />
        </div>
      </div>
    </TicketBoardContext.Provider>
  )
}

TicketBoard.Column = Column