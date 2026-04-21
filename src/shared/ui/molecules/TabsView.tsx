'use client'

import { TaskListContainer } from '@/features/tasksManagement/components/TaskListContainer'
import { TicketBoard } from '@/features/tickets/components/TicketBoard'
import { Tabs } from '@/shared/ui/molecules'
import { useTasks } from '@/features/tasksManagement/context/TaskContext'

type Props = {
  activeTab: string
  onChangeTab: (tab: string) => void
}

export function TabsView({ activeTab, onChangeTab }: Props) {
  const { selectedTaskId, setSelectedTaskId } = useTasks()

  const handleChangeTab = (tab: string) => {
    if (tab === 'tickets' && !selectedTaskId) return

    if (tab === 'tasks') {
      setSelectedTaskId(null)
    }

    onChangeTab(tab)
  }

  return (
    <Tabs activeTab={activeTab} onChangeTab={handleChangeTab}>
      <Tabs.Header>
        <Tabs.Tab id="tasks">Tareas</Tabs.Tab>

        <Tabs.Tab id="tickets">
          Tickets {!selectedTaskId && '🔒'}
        </Tabs.Tab>
      </Tabs.Header>

      <Tabs.Content id="tasks">
        <TaskListContainer />
      </Tabs.Content>

      <Tabs.Content id="tickets">
        <TicketBoard />
      </Tabs.Content>
    </Tabs>
  )
}