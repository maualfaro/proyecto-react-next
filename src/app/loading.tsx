export default function Loading() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '24px 16px',
      }}
    >       
      <div
        className="animate-pulse"
        style={{
          height: 80,
          borderRadius: 16,
          background: '#e5e7eb',
          marginBottom: 24,
        }}
      />
      <div
        className="animate-pulse"
        style={{
          height: 40,
          borderRadius: 12,
          background: '#e5e7eb',
          marginBottom: 16,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              height: 60,
              borderRadius: 12,
              background: '#e5e7eb',
            }}
          />
        ))}
      </div>
    </div>
  )
}