export default function Loading() {
  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          height: 40,
          borderRadius: 10,
          background: '#e5e7eb',
          marginBottom: 16,
        }}
        className="animate-pulse"
      />
      <div
        style={{
          height: 40,
          width: 100,
          borderRadius: 10,
          background: '#e5e7eb',
          marginBottom: 16,
        }}
        className="animate-pulse"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: 50,
              borderRadius: 10,
              background: '#e5e7eb',
            }}
            className="animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}