'use client'

import { useState, useEffect } from 'react'
import { useTasks } from '@/features/tasksManagement/context/TaskContext'
import { TabsView } from '@/shared/ui/molecules'

export default function AppContent() {
  const [activeTab, setActiveTab] = useState('tasks')
  const { selectedTaskId } = useTasks()

  useEffect(() => {
    if (selectedTaskId) {
      setActiveTab('tickets')
    }
  }, [selectedTaskId])

  return (
    <TabsView
      activeTab={activeTab}
      onChangeTab={setActiveTab}
    />
  )
}