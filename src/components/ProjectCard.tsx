import { useRef } from 'react'
import { useFadeIn } from '../animations/useFadeIn'
import type { Project } from '../config/projects'
import { fr } from '../i18n/fr'
import { setHoveredProject } from '../scene/store'
import { ProjectVisual } from './ProjectVisual'

interface ProjectCardProps {
  project: Project
  index: number
  className?: string
  onOpen: (index: number, trigger: HTMLButtonElement) => void
}

export function ProjectCard({ project, index, className = '', onOpen }: ProjectCardProps) {
  const rootRef = useRef<HTMLLIElement>(null)
  const text = fr.work.items[project.id]
  useFadeIn(rootRef, (index % 2) * 0.1)

  if (!text) return null

  return (
    <li ref={rootRef} className={className}>
      <button
        type="button"
        data-cursor
        aria-haspopup="dialog"
        aria-label={`${fr.work.open} : ${text.title}`}
        onClick={(event) => onOpen(index, event.currentTarget)}
        onPointerEnter={() => setHoveredProject(index)}
        onPointerLeave={() => setHoveredProject(null)}
        onFocus={() => setHoveredProject(index)}
        onBlur={() => setHoveredProject(null)}
        className="group block w-full rounded-sm text-left"
      >
        <ProjectVisual project={project} className="aspect-[4/3] w-full rounded-sm transition-colors duration-base ease-transition group-hover:border-ink/40" />
        <span className="mt-5 flex items-baseline justify-between gap-4">
          <span className="font-display text-2xl tracking-tight md:text-3xl">{text.title}</span>
          <span className="text-sm tabular-nums text-muted">{project.year}</span>
        </span>
        <span className="eyebrow mt-2 block">{text.category}</span>
      </button>
    </li>
  )
}
