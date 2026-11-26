import { useRef, useState } from 'react'
import { useActiveSection } from '../animations/useActiveSection'
import { LineTitle } from '../components/LineTitle'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectPanel } from '../components/ProjectPanel'
import { PROJECTS } from '../config/projects'
import { fr } from '../i18n/fr'

// Les cartes impaires sont décalées sur grand écran pour casser la grille
const CARD_CLASSES = [
  'col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-1',
  'col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-7 lg:mt-32',
  'col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2',
  'col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-32',
]

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const returnFocus = useRef<HTMLButtonElement | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  useActiveSection(ref, 'work')

  const open = (index: number, trigger: HTMLButtonElement): void => {
    returnFocus.current = trigger
    setOpenIndex(index)
  }

  const close = (): void => {
    setOpenIndex(null)
    returnFocus.current?.focus()
  }

  const selected = openIndex === null ? undefined : PROJECTS[openIndex]

  return (
    <section ref={ref} id="work" aria-labelledby="work-title" className="section-y">
      <div className="grid-12">
        <div className="col-span-12 mb-16 lg:col-span-8">
          <LineTitle id="work-title" text={fr.work.title} className="font-display text-title" />
          <p className="mt-5 max-w-md text-lead text-muted">{fr.work.intro}</p>
        </div>
        <ul className="col-span-12 grid list-none grid-cols-12 gap-x-4 gap-y-14 p-0 md:gap-x-6 md:gap-y-20">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              className={CARD_CLASSES[index] ?? 'col-span-12 md:col-span-6'}
              onOpen={open}
            />
          ))}
        </ul>
      </div>
      {selected && <ProjectPanel project={selected} onClose={close} />}
    </section>
  )
}
