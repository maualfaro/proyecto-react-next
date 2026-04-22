import { describe, test, expect, beforeEach } from 'vitest'
import { useTicketStore } from '@/store/useTicketStore'

beforeEach(() => {
  useTicketStore.setState({
    tickets: [],
    search: '',
    priorityFilter: '',
    assigneeFilter: '',
  })
})

describe('useTicketStore', () => {
  test('agrega un ticket', () => {
    const { addTicket } = useTicketStore.getState()

    addTicket({
      id: '1',
      title: 'Ticket test',
      taskId: '1',
      status: 'backlog',
      priority: 'Media',
      assignee: 'Mauricio',
      label: 'bug',
    })

    const { tickets } = useTicketStore.getState()

    expect(tickets.length).toBe(1)
    expect(tickets[0].title).toBe('Ticket test')
  })

  test('mueve un ticket', () => {
    useTicketStore.setState({
      tickets: [
        {
          id: '1',
          title: 'Mover ticket',
          taskId: '1',
          status: 'backlog',
          priority: 'Media',
          assignee: '',
          label: '',
        },
      ],
    })

    const { moveTicket } = useTicketStore.getState()
    moveTicket('1')

    const { tickets } = useTicketStore.getState()

    expect(tickets[0].status).toBe('in_progress')
  })

  test('elimina un ticket', () => {
    useTicketStore.setState({
      tickets: [
        {
          id: '1',
          title: 'Eliminar ticket',
          taskId: '1',
          status: 'backlog',
          priority: 'Media',
          assignee: '',
          label: '',
        },
      ],
    })

    const { deleteTicket } = useTicketStore.getState()
    deleteTicket('1')

    const { tickets } = useTicketStore.getState()

    expect(tickets.length).toBe(0)
  })
})