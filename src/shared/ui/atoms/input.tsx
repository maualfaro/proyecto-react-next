'use client'

//Es client component porque tiene eventos (onChange) y maneja estado (value)
type Props = {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
}

export function Input({ value, onChange, onBlur, placeholder }: Props) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
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