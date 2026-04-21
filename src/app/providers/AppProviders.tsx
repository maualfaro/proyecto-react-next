'use client'

import { ReactNode } from 'react'
import { TaskProvider } from '@/features/tasksManagement/context/TaskContext'
import { TicketProvider } from '@/features/tickets/context/TicketContext'
import { SeedDataLoader } from '@/shared/data/SeedDataLoader'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <TaskProvider>
      <TicketProvider>
        <SeedDataLoader />
        {children}
      </TicketProvider>
    </TaskProvider>
  )
}