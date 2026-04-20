import { useState } from 'react'

type Errors<T> = Partial<Record<keyof T, string>>

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

  const validate = (validator: (values: T) => Errors<T>) => {
    const validationErrors = validator(values)
    setErrors(validationErrors)
    return validationErrors
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validate,
    reset,
  }
}