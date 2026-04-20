// Server Component — se mantiene como server porque solo carga datos y renderiza la vista

async function getData() {
  // Simula una carga lenta (para probar loading.tsx)
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return []
}

export default async function TasksPage() {
  const tasks = await getData()

  return (
    <div style={{ padding: '16px' }}>
      <h1>Tasks</h1>

      {/* Aquí luego vas a renderizar tu lista real */}
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