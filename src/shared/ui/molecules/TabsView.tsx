'use client'

import { ProjectListContainer } from '@/features/projects/components/ProjectListContainer'
import { TaskListContainer } from '@/features/tasksManagement/components/TaskListContainer'
import { Tabs } from '@/shared/ui/molecules'

type Props = {
  activeTab: string
  onChangeTab: (tab: string) => void
}

export function TabsView({ activeTab, onChangeTab }: Props) {
  return (
    <Tabs activeTab={activeTab} onChangeTab={onChangeTab}>
      <Tabs.Header>
        <Tabs.Tab id="tasks">Tareas</Tabs.Tab>
        <Tabs.Tab id="projects">Tickets</Tabs.Tab>
      </Tabs.Header>

      <Tabs.Content id="tasks">
        <TaskListContainer />
      </Tabs.Content>

      <Tabs.Content id="projects">
        <ProjectListContainer />
      </Tabs.Content>
    </Tabs>
  )
}