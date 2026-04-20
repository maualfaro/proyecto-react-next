'use client'
//  encapsula lógica de manejo de formularios

import { useState } from 'react'

type Errors<T> = Partial<Record<keyof T, string>>

// ✅ Custom Hook — maneja estado de formularios y validación
export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Errors<T>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field as string]: true }))
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setErrors,
    setIsSubmitting,
    handleChange,
    handleBlur,
    reset
  }
}