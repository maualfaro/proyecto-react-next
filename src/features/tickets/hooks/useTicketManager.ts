'use client'

import { useReducer, useEffect } from 'react'
import type { Ticket, TicketStatus } from '../types'
import seedData from '@/shared/data/seedData.json'

type State = {
  tickets: Ticket[]
}

type Action =
  | { type: 'ADD_TICKET'; payload: Ticket }
  | { type: 'MOVE_TICKET'; payload: string }
  | { type: 'MOVE_TICKET_BACK'; payload: string }
  | { type: 'DELETE_TICKET'; payload: string } 

const getInitialTickets = (): Ticket[] => {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('tickets')

    if (stored) return JSON.parse(stored)

    const typedTickets = seedData.tickets as Ticket[]

    localStorage.setItem('tickets', JSON.stringify(typedTickets))
    return typedTickets
  } catch {
    return []
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TICKET':
      return { ...state, tickets: [...state.tickets, action.payload] }

    case 'MOVE_TICKET': {
      const order: TicketStatus[] = [
        'backlog',
        'in_progress',
        'review',
        'done',
      ]

      return {
        ...state,
        tickets: state.tickets.map(t => {
          if (t.id !== action.payload) return t

          const nextIndex = order.indexOf(t.status) + 1

          return {
            ...t,
            status: order[nextIndex] || 'done',
          }
        }),
      }
    }

    case 'MOVE_TICKET_BACK': {
      const order: TicketStatus[] = [
        'backlog',
        'in_progress',
        'review',
        'done',
      ]

      return {
        ...state,
        tickets: state.tickets.map(t => {
          if (t.id !== action.payload) return t

          const prevIndex = order.indexOf(t.status) - 1

          return {
            ...t,
            status: order[prevIndex] || 'backlog',
          }
        }),
      }
    }

    case 'DELETE_TICKET': 
      return {
        ...state,
        tickets: state.tickets.filter(t => t.id !== action.payload),
      }

    default:
      return state
  }
}

export function useTicketManager() {
  const [state, dispatch] = useReducer(reducer, {
    tickets: getInitialTickets(),
  })

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(state.tickets))
  }, [state.tickets])

  const addTicket = (ticket: Ticket) => {
    dispatch({ type: 'ADD_TICKET', payload: ticket })
  }

  const moveTicket = (id: string) => {
    dispatch({ type: 'MOVE_TICKET', payload: id })
  }

  const moveTicketBack = (id: string) => {
    dispatch({ type: 'MOVE_TICKET_BACK', payload: id })
  }

  const deleteTicket = (id: string) => {
    dispatch({ type: 'DELETE_TICKET', payload: id })
  }

  return {
    tickets: state.tickets,
    addTicket,
    moveTicket,
    moveTicketBack,
    deleteTicket, 
  }
}