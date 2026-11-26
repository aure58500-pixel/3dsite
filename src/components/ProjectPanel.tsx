import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { setScrollLocked } from '../animations/useLenis'
import { DURATION, EASE } from '../config/timing'
import type { Project } from '../config/projects'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fr } from '../i18n/fr'
import { ProjectVisual } from './ProjectVisual'

interface ProjectPanelProps {
  project: Project
  onClose: () => void
}

const FOCUSABLE = 'button, a[href], [tabindex]:not([tabindex="-1"])'

/** Panneau latéral modal : piège le focus, se ferme avec Échap ou un clic sur le fond */
export function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  const reduced = useReducedMotion()
  const [closing, setClosing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const text = fr.work.items[project.id]

  useEffect(() => {
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (!panel || !backdrop || reduced) return
    gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: DURATION.base, ease: EASE.entrance })
    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: DURATION.base, ease: EASE.transition })
  }, [reduced])

  useEffect(() => {
    closeRef.current?.focus()
    setScrollLocked(true)
    return () => setScrollLocked(false)
  }, [])

  const requestClose = (): void => {
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (closing) return
    if (reduced || !panel || !backdrop) {
      onClose()
      return
    }
    setClosing(true)
    gsap.to(backdrop, { opacity: 0, duration: DURATION.fast, ease: EASE.transition })
    gsap.to(panel, { xPercent: 100, duration: DURATION.fast, ease: EASE.transition, onComplete: onClose })
  }

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      requestClose()
      return
    }
    if (event.key !== 'Tab' || !panelRef.current) return
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
    const first = items[0]
    const last = items[items.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!text) return null

  // Portail vers body : hors du contexte d'empilement de main, au-dessus de l'en-tête et du grain
  return createPortal(
    <div className="fixed inset-0 z-[65]" onKeyDown={onKeyDown}>
      <div ref={backdropRef} className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={requestClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-panel-title"
        data-lenis-prevent
        className="absolute inset-y-0 right-0 w-full max-w-xl overflow-y-auto border-l border-line bg-[#0D0D12] p-6 md:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={requestClose}
          className="mb-6 rounded-sm px-2 py-2 text-sm uppercase tracking-widest text-muted hover:text-ink"
        >
          {fr.work.close}
        </button>
        <ProjectVisual project={project} className="aspect-[4/3] w-full rounded-sm" />
        <p className="mt-6 text-sm uppercase tracking-widest text-muted">
          {text.category} &middot; {fr.work.year} {project.year}
        </p>
        <h3 id="project-panel-title" className="mt-2 font-display text-4xl md:text-5xl">
          {text.title}
        </h3>
        <p className="mt-4 text-lg text-muted">{text.description}</p>
        <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 xs:grid-cols-3">
          {text.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse justify-end gap-1">
              <dt className="text-sm text-muted">{metric.label}</dt>
              <dd className="m-0 font-display text-3xl" style={{ color: project.color }}>
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>,
    document.body,
  )
}
