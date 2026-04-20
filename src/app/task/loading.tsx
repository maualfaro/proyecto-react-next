//server component porque no tiene estado ni eventos, solo renderiza la UI
export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      
      <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>

      <div className="space-y-2">
        <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
      </div>

    </div>
  )
}