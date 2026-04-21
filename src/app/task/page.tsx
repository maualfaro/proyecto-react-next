// Server Component — se mantiene como server porque solo carga datos y renderiza la vista

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tareas | TaskFlow',
  description: 'Gestiona tus tareas fácilmente',
  openGraph: {
    title: 'Tareas | TaskFlow',
    description: 'Gestiona tus tareas fácilmente',
  },
}

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return []
}

export default async function TasksPage() {
  const tasks = await getData()

  return (
    <div style={{ padding: '16px' }}>
      <h1>Tasks</h1>

      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tasks.map((task: any) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}