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
    <li ref={rootRef} className="hairline last:border-b">
      <h3>
        <button
          id={triggerId}
          type="button"
          data-accordion-trigger
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex min-h-[72px] w-full items-center gap-4 py-5 text-left md:gap-6 md:py-7"
        >
          <ServiceIcon kind={index} open={open} />
          <span className="flex-1 font-display text-2xl tracking-tight md:text-3xl">{title}</span>
          <span
            aria-hidden="true"
            className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-fast ease-entrance group-hover:border-ink ${open ? 'border-ink' : 'border-line'}`}
          >
            <span className="absolute h-px w-3.5 bg-ink" />
            <span
              className={`absolute h-3.5 w-px bg-ink transition-transform duration-base ease-transition ${open ? 'scale-y-0' : ''}`}
            />
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
          <p className={`max-w-xl pb-7 pl-12 text-base text-muted md:pl-14 ${open ? '' : 'invisible'}`}>{description}</p>
        </div>
      </div>
    </li>
  )
}
