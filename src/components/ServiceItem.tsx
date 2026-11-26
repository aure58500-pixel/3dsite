import { useRef } from 'react'
import { useFadeIn } from '../animations/useFadeIn'
import { ServiceIcon } from './ServiceIcon'

interface ServiceItemProps {
  index: number
  title: string
  description: string
  open: boolean
  onToggle: () => void
}

/** Entrée d'accordéon ARIA : un bouton d'en-tête et une région repliable */
export function ServiceItem({ index, title, description, open, onToggle }: ServiceItemProps) {
  const rootRef = useRef<HTMLLIElement>(null)
  useFadeIn(rootRef, index * 0.06)
  const triggerId = `service-trigger-${index}`
  const panelId = `service-panel-${index}`

  return (
    <li ref={rootRef} className="border-t border-line last:border-b">
      <h3>
        <button
          id={triggerId}
          type="button"
          data-accordion-trigger
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center gap-4 py-6 text-left md:gap-6"
        >
          <ServiceIcon kind={index} open={open} />
          <span className="flex-1 font-display text-2xl md:text-4xl">{title}</span>
          <span
            aria-hidden="true"
            className={`text-2xl text-muted transition-transform duration-base ease-transition ${open ? 'rotate-45' : ''}`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid transition-[grid-template-rows] duration-base ease-transition ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className={`max-w-xl pb-6 pl-12 text-muted md:pl-14 ${open ? '' : 'invisible'}`}>{description}</p>
        </div>
      </div>
    </li>
  )
}
