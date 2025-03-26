"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { z } from "zod"

type ValidationErrors<T> = Partial<Record<keyof T, string>>

interface UseFormValidationProps<T> {
  initialValues: T
  schema: z.ZodType<T>
  onSubmit: (values: T) => void | Promise<void>
}

export function useFormValidation<T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormValidationProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors<T>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input change
  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }))

      // Validate the field if it's been touched
      if (touched[field]) {
        try {
          schema.shape[field as string].parse(value)
          setErrors((prev) => ({ ...prev, [field]: undefined }))
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldError = error.errors[0]?.message || "Invalid input"
            setErrors((prev) => ({ ...prev, [field]: fieldError }))
          }
        }
      }
    },
    [schema, touched],
  )

  // Mark a field as touched when it loses focus
  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field]: true }))

      // Validate the field
      try {
        schema.shape[field as string].parse(values[field])
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors[0]?.message || "Invalid input"
          setErrors((prev) => ({ ...prev, [field]: fieldError }))
        }
      }
    },
    [schema, values],
  )

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      setTouched(allTouched as Partial<Record<keyof T, boolean>>)

      // Validate all fields
      try {
        const validatedData = schema.parse(values)
        setErrors({})
        await onSubmit(validatedData)
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: ValidationErrors<T> = {}
          error.errors.forEach((err) => {
            if (err.path.length > 0) {
              const field = err.path[0] as keyof T
              newErrors[field] = err.message
            }
          })
          setErrors(newErrors)
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [schema, values, onSubmit],
  )

  // Reset the form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  }
}

