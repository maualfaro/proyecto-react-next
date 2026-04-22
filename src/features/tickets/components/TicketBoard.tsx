'use client'

import { useTickets } from '../context/TicketContext'
import { useTasks } from '@/features/tasksManagement/context/TaskContext'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useMemo } from 'react'
import { Input } from '@/shared/ui/atoms'
import { TicketColumn } from './TicketColumn'
import { TicketForm } from './TicketForm'
import { useTicketStore } from '@/store/useTicketStore'

export function TicketBoard() {
  const tickets = useTicketStore(s => s.tickets)
  const moveTicket = useTicketStore(s => s.moveTicket)
  const moveTicketBack = useTicketStore(s => s.moveTicketBack)
  const deleteTicket = useTicketStore(s => s.deleteTicket)

  const search = useTicketStore(s => s.search)
  const setSearch = useTicketStore(s => s.setSearch)

  const priorityFilter = useTicketStore(s => s.priorityFilter)
  const setPriorityFilter = useTicketStore(s => s.setPriorityFilter)

  const assigneeFilter = useTicketStore(s => s.assigneeFilter)
  const setAssigneeFilter = useTicketStore(s => s.setAssigneeFilter)

  const {
    selectedTaskId,
    tasks,
  } = useTasks()

  const currentTask = tasks.find(t => t.id === selectedTaskId)

  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    return tickets
      .filter(t =>
        selectedTaskId ? t.taskId === selectedTaskId : true
      )
      .filter(t =>
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .filter(t =>
        priorityFilter ? t.priority === priorityFilter : true
      )
      .filter(t =>
        assigneeFilter
          ? t.assignee.toLowerCase().includes(assigneeFilter.toLowerCase())
          : true
      )
  }, [
    tickets,
    selectedTaskId,
    debouncedSearch,
    priorityFilter,
    assigneeFilter,
  ])

  return (
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
        <TicketColumn
          title="Backlog"
          status="backlog"
          tickets={filtered}
          move={moveTicket}
          moveBack={moveTicketBack}
          deleteTicket={deleteTicket}
        />

        <TicketColumn
          title="En progreso"
          status="in_progress"
          tickets={filtered}
          move={moveTicket}
          moveBack={moveTicketBack}
          deleteTicket={deleteTicket}
        />

        <TicketColumn
          title="En revisión"
          status="review"
          tickets={filtered}
          move={moveTicket}
          moveBack={moveTicketBack}
          deleteTicket={deleteTicket}
        />

        <TicketColumn
          title="Completado"
          status="done"
          tickets={filtered}
          move={moveTicket}
          moveBack={moveTicketBack}
          deleteTicket={deleteTicket}
        />
      </div>
    </div>
  )
}