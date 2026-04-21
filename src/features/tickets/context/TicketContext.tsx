'use client'

import { createContext, useContext, useState } from 'react'
import { useTicketManager } from '../hooks/useTicketManager'
import type { Ticket } from '../types'

type ContextType = {
  tickets: Ticket[]
  addTicket: (ticket: Ticket) => void
  moveTicket: (id: string) => void
  moveTicketBack: (id: string) => void
  deleteTicket: (id: string) => void

  search: string
  setSearch: (v: string) => void

  priorityFilter: string
  setPriorityFilter: (v: string) => void

  assigneeFilter: string
  setAssigneeFilter: (v: string) => void
}

const TicketContext = createContext<ContextType | null>(null)

export function TicketProvider({ children }: any) {
  const { tickets, addTicket, moveTicket, moveTicketBack, deleteTicket } = useTicketManager()

  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [assigneeFilter, setAssigneeFilter] = useState('')

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        moveTicket,
        moveTicketBack,
        deleteTicket,
        search,
        setSearch,
        priorityFilter,
        setPriorityFilter,
        assigneeFilter,
        setAssigneeFilter,
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

export const useTickets = () => {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error('useTickets fuera de provider')
  return ctx
}