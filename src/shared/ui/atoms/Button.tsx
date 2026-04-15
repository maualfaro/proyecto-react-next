type ButtonProps = {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'danger'
}

export function Button({
  label,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '10px 16px',
        borderRadius: 10,
        border: 'none',
        cursor: 'pointer',
        backgroundColor: variant === 'danger' ? '#ef4444' : '#2563eb',
        color: '#ffffff',
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  )
}