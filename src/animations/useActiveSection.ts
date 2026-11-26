import { useEffect, type RefObject } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setActiveSection, type SectionId } from '../scene/store'

/** Signale à la scène 3D quelle section occupe le milieu de l'écran */
export function useActiveSection(ref: RefObject<HTMLElement | null>, id: SectionId): void {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) setActiveSection(id)
      },
    })
    return () => trigger.kill()
  }, [ref, id])
}
