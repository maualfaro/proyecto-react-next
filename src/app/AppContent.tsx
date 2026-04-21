'use client'

import { TabsView } from '@/shared/ui/molecules'
import { useState, useEffect } from 'react'
import { useTasks } from '@/features/tasksManagement/context/TaskContext'

export default function AppContent() {
  const [activeTab, setActiveTab] = useState('tasks')
  const { selectedTaskId } = useTasks()

  useEffect(() => {
    if (selectedTaskId) {
      setActiveTab('projects') 
    }
  }, [selectedTaskId])

  return <TabsView activeTab={activeTab} onChangeTab={setActiveTab} />
}