'use client'

import { create } from 'zustand'
import type { Ticket, TicketStatus } from '@/features/tickets/types'
import seedData from '@/shared/data/seedData.json'

type State = {
  tickets: Ticket[]
  search: string
  priorityFilter: string
  assigneeFilter: string
}

type Actions = {
  addTicket: (ticket: Ticket) => void
  moveTicket: (id: string) => void
  moveTicketBack: (id: string) => void
  deleteTicket: (id: string) => void

  setSearch: (v: string) => void
  setPriorityFilter: (v: string) => void
  setAssigneeFilter: (v: string) => void
}

const order: TicketStatus[] = [
  'backlog',
  'in_progress',
  'review',
  'done',
]

export const useTicketStore = create<State & Actions>((set) => ({
  tickets: seedData.tickets as Ticket[],

  search: '',
  priorityFilter: '',
  assigneeFilter: '',

  addTicket: (ticket) =>
    set((state) => ({
      tickets: [...state.tickets, ticket],
    })),

  moveTicket: (id) =>
    set((state) => ({
      tickets: state.tickets.map((t) => {
        if (t.id !== id) return t
        const next = order.indexOf(t.status) + 1
        return { ...t, status: order[next] || 'done' }
      }),
    })),

  moveTicketBack: (id) =>
    set((state) => ({
      tickets: state.tickets.map((t) => {
        if (t.id !== id) return t
        const prev = order.indexOf(t.status) - 1
        return { ...t, status: order[prev] || 'backlog' }
      }),
    })),

  deleteTicket: (id) =>
    set((state) => ({
      tickets: state.tickets.filter((t) => t.id !== id),
    })),

  setSearch: (v) => set({ search: v }),
  setPriorityFilter: (v) => set({ priorityFilter: v }),
  setAssigneeFilter: (v) => set({ assigneeFilter: v }),
}))