'use client'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onBlur?: () => void
}

export function Input({ value, onChange, placeholder, onBlur }: Props) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      style={{
        width: '100%',
        padding: '10px 14px',
        borderRadius: 10,
        border: '1px solid #d1d5db',
        outline: 'none',
        fontSize: 14,
      }}
    />
  )
}