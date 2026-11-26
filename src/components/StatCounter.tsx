import { useRef } from 'react'
import { useCounter } from '../animations/useCounter'
import { useFadeIn } from '../animations/useFadeIn'

interface StatCounterProps {
  value: number
  suffix: string
  label: string
  delay?: number
}

export function StatCounter({ value, suffix, label, delay = 0 }: StatCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  useFadeIn(rootRef, delay)
  useCounter(numberRef, value, suffix)

  return (
    <div ref={rootRef} className="hairline pt-6">
      <dt className="sr-only">{label}</dt>
      <dd className="m-0">
        <span ref={numberRef} aria-hidden="true" className="block font-display text-6xl tracking-tight text-ink md:text-7xl" />
        <span className="sr-only">{`${value}${suffix}`}</span>
        <span aria-hidden="true" className="eyebrow mt-3 block">
          {label}
        </span>
      </dd>
    </div>
  )
}
