import { useRef } from 'react'
import { useActiveSection } from '../animations/useActiveSection'
import { useWordReveal } from '../animations/useWordReveal'
import { fr } from '../i18n/fr'

export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  useActiveSection(ref, 'hero')
  useWordReveal(textRef)

  return (
    <section ref={ref} aria-label={fr.manifesto.label} className="section-y md:py-48">
      <div className="grid-12">
        <p ref={textRef} className="col-span-12 font-display text-statement lg:col-span-10 lg:col-start-2">
          {fr.manifesto.text.split(' ').map((word, index) => (
            <span key={index}>
              <span data-word className="opacity-20">
                {word}
              </span>{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
