import { useRef } from 'react'
import { useLineReveal } from '../animations/useLineReveal'

interface LineTitleProps {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  id?: string
  className?: string
  /** Retarde l'animation tant que la condition est fausse (ex. fin du loader) */
  enabled?: boolean
}

/** Titre dont chaque mot est masqué, pour une révélation ligne par ligne */
export function LineTitle({ text, as: Tag = 'h2', id, className = '', enabled = true }: LineTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  useLineReveal(ref, enabled)

  return (
    <Tag ref={ref} id={id} className={className}>
      {text.split(' ').map((word, index) => (
        <span key={index}>
          <span data-line-word className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
            <span className="inline-block will-change-transform">{word}</span>
          </span>{' '}
        </span>
      ))}
    </Tag>
  )
}
