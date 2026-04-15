type InputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      value={value}
      onChange={(event) => onChange((event.target as HTMLInputElement).value)}
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