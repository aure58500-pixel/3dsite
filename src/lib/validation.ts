export interface ContactValues {
  name: string
  email: string
  message: string
}

export type ContactErrorKey = 'required' | 'email' | 'short'
export type ContactErrors = Partial<Record<keyof ContactValues, ContactErrorKey>>

export const MIN_MESSAGE_LENGTH = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(field: keyof ContactValues, value: string): ContactErrorKey | null {
  const trimmed = value.trim()
  if (trimmed.length === 0) return 'required'
  if (field === 'email' && !EMAIL_PATTERN.test(trimmed)) return 'email'
  if (field === 'message' && trimmed.length < MIN_MESSAGE_LENGTH) return 'short'
  return null
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  for (const field of ['name', 'email', 'message'] as const) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}
