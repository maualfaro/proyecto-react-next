
// Este componente es un server component porque no tiene estado ni eventos, solo renderiza la UI
import React from 'react'

type CardVariant = 'default' | 'elevated' | 'outline'

type CardProps = {
  title: string
  children: React.ReactNode
  variant?: CardVariant
  icon?: React.ReactNode
  footer?: React.ReactNode
  onClick?: () => void
}

export function Card({
  title,
  children,
  variant = 'default',
  icon,
  footer,
  onClick,
}: CardProps) {
  const baseStyle: React.CSSProperties = {
    borderRadius: '14px',
    padding: '16px',
    background: '#fff',
    transition: 'all 0.2s ease',
    cursor: onClick ? 'pointer' : 'default',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }

  const variants: Record<CardVariant, React.CSSProperties> = {
    default: {
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    },
    elevated: {
      border: '1px solid transparent',
      boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
    },
    outline: {
      border: '1px solid #d1d5db',
      boxShadow: 'none',
    },
  }

  return (
    <div
      style={{ ...baseStyle, ...variants[variant] }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!onClick) return
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        if (!onClick) return
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow =
          variant === 'elevated'
            ? '0 10px 25px rgba(0,0,0,0.12)'
            : variant === 'outline'
            ? 'none'
            : '0 1px 3px rgba(0,0,0,0.06)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {icon && <div>{icon}</div>}

        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
          }}
        >
          {title}
        </h3>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: '#4b5563',
          lineHeight: 1.5,
        }}
      >
        {children}
      </div>
      {footer && (
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '10px',
            borderTop: '1px solid #f3f4f6',
            fontSize: '13px',
            color: '#6b7280',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  )
}