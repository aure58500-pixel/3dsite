import { useRef, useState, type KeyboardEvent } from 'react'
import { useActiveSection } from '../animations/useActiveSection'
import { LineTitle } from '../components/LineTitle'
import { ServiceItem } from '../components/ServiceItem'
import { fr } from '../i18n/fr'

export function Services() {
  const ref = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  useActiveSection(ref, 'services')

  // Navigation clavier entre les en-têtes : flèches, début et fin
  const onKeyDown = (event: KeyboardEvent): void => {
    const triggers = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[data-accordion-trigger]') ?? [])
    const current = triggers.indexOf(document.activeElement as HTMLElement)
    if (current === -1) return
    const moves: Record<string, number> = {
      ArrowDown: (current + 1) % triggers.length,
      ArrowUp: (current - 1 + triggers.length) % triggers.length,
      Home: 0,
      End: triggers.length - 1,
    }
    const next = moves[event.key]
    if (next === undefined) return
    event.preventDefault()
    triggers[next]?.focus()
  }

  return (
    <section ref={ref} id="services" aria-labelledby="services-title" className="section-y">
      <div className="grid-12">
        <LineTitle id="services-title" text={fr.services.title} className="col-span-12 mb-10 font-display text-title lg:col-span-5 lg:mb-0" />
        <ul ref={listRef} onKeyDown={onKeyDown} className="col-span-12 m-0 list-none p-0 lg:col-span-6 lg:col-start-7">
          {fr.services.items.map((item, index) => (
            <ServiceItem
              key={item.title}
              index={index}
              title={item.title}
              description={item.description}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
