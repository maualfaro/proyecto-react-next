type BadgeProps = {
  text: string
  variant?: 'success' | 'warning'
}

export function Badge({ text, variant = 'warning' }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 9999,
        backgroundColor: variant === 'success' ? '#4ade80' : '#facc15',
        color: variant === 'success' ? '#065f46' : '#92400e',
        fontWeight: 700,
        fontSize: 12,
      }}
    >
      {text}
    </span>
  )
}