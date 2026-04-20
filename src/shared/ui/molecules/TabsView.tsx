"use client"
// Este componente maneja estado (activeTab) y eventos (setActiveTab), por eso es un client component
import { ProjectListContainer } from '@/features/projects/components/ProjectListContainer'
import { TaskListContainer } from '@/features/tasksManagement/components/TaskListContainer'
import { Tabs } from '@/shared/ui/molecules'

export function TabsView() {
  return (
    <Tabs>
            <Tabs.Header>
              <Tabs.Tab id="tasks">Tareas</Tabs.Tab>
              <Tabs.Tab id="projects">Proyectos</Tabs.Tab>
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