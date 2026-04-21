import { TabsView } from '@/shared/ui/molecules'
import { Avatar } from '@/shared/ui/atoms'
import { AppProviders } from './providers/AppProviders'

async function App() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '24px 16px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          marginBottom: 28,
          padding: '20px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #f9fafb, #ffffff)',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', 
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 0 4px rgba(34,197,94,0.15)',
              }}
            />

            <h1
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 700,
                color: '#111827',
                letterSpacing: '-0.03em',
              }}
            >
              Proyecto React
            </h1>
          </div>
          <Avatar
            src="https://i.pravatar.cc/40"
            alt="User avatar"
          />
        </div>
      </div>

      <AppProviders>
        <TabsView />
      </AppProviders>
    </div>
  )
}

export default App