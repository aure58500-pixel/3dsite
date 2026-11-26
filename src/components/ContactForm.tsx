import { useEffect, useRef, useState, type FormEvent } from 'react'
import { fr } from '../i18n/fr'
import {
  validateContact,
  validateField,
  type ContactErrors,
  type ContactValues,
} from '../lib/validation'

type Status = 'idle' | 'sending' | 'success' | 'error'

const SEND_DELAY_MS = 1500
const EMPTY: ContactValues = { name: '', email: '', message: '' }
const FIELDS = ['name', 'email', 'message'] as const

const inputClass =
  'min-h-[52px] w-full rounded-md border border-line bg-ink/[0.03] px-4 py-3 text-base text-ink transition-colors duration-fast placeholder:text-muted hover:border-ink/40 focus:border-ink aria-[invalid=true]:border-accent read-only:opacity-70'

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const timer = useRef<number | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onBlur = (field: keyof ContactValues): void => {
    const error = validateField(field, values[field])
    setErrors((prev) => ({ ...prev, [field]: error ?? undefined }))
  }

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    if (status === 'sending') return
    const found = validateContact(values)
    setErrors(found)
    const firstInvalid = FIELDS.find((field) => found[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    setStatus('sending')
    // Démonstration : aucune API réelle n'est appelée, le message n'est pas transmis
    timer.current = window.setTimeout(() => {
      if (navigator.onLine) {
        setStatus('success')
        setValues(EMPTY)
      } else {
        setStatus('error')
      }
    }, SEND_DELAY_MS)
  }

  const sending = status === 'sending'

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={sending} className="flex flex-col gap-7">
      {FIELDS.map((field) => {
        const error = errors[field]
        const errorId = `contact-${field}-error`
        const common = {
          id: `contact-${field}`,
          name: field,
          value: values[field],
          readOnly: sending,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
          'aria-required': true,
          className: inputClass,
          onBlur: () => onBlur(field),
        }
        const onChange = (value: string): void => setValues((prev) => ({ ...prev, [field]: value }))
        return (
          <div key={field} className="flex flex-col gap-2">
            <label htmlFor={common.id} className="eyebrow">
              {fr.contact.fields[field]}
            </label>
            {field === 'message' ? (
              <textarea {...common} rows={5} onChange={(e) => onChange(e.target.value)} />
            ) : (
              <input
                {...common}
                type={field === 'email' ? 'email' : 'text'}
                autoComplete={field === 'email' ? 'email' : 'name'}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
            {error && (
              <p id={errorId} role="alert" className="text-sm text-accent">
                {fr.contact.errors[error]}
              </p>
            )}
          </div>
        )
      })}
      <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          data-cursor
          aria-disabled={sending}
          className="btn-primary w-full xs:w-auto aria-disabled:cursor-wait aria-disabled:opacity-60"
        >
          {sending ? fr.contact.sending : status === 'error' ? fr.contact.retry : fr.contact.submit}
        </button>
        <p role="status" aria-live="polite" className={`text-sm ${status === 'error' ? 'text-accent' : 'text-ink'}`}>
          {status === 'success' && fr.contact.success}
          {status === 'error' && fr.contact.failure}
        </p>
      </div>
    </form>
  )
}
