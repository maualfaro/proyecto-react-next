export type TicketStatus =
  | 'backlog'
  | 'in_progress'
  | 'review'
  | 'done'

export type Priority = 'Alta' | 'Media' | 'Baja'

export type Ticket = {
  id: string
  title: string
  taskId: string
  status: TicketStatus
  priority: Priority
  assignee: string
  label: string
}