import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASE, LINE_STAGGER, REVEAL_DURATION } from '../config/timing'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Révèle un titre ligne par ligne. Les mots portent data-line-word ; on les
 * regroupe par position verticale pour retrouver les lignes réellement rendues.
 */
export function useLineReveal(ref: RefObject<HTMLElement | null>, enabled = true): void {
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || reduced || !enabled) return

    const lines = new Map<number, HTMLElement[]>()
    element.querySelectorAll<HTMLElement>('[data-line-word]').forEach((mask) => {
      const inner = mask.firstElementChild as HTMLElement | null
      if (!inner) return
      const group = lines.get(mask.offsetTop) ?? []
      group.push(inner)
      lines.set(mask.offsetTop, group)
    })

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
      Array.from(lines.entries())
        .sort(([a], [b]) => a - b)
        .forEach(([, inners], index) => {
          timeline.from(
            inners,
            { yPercent: 110, duration: REVEAL_DURATION, ease: EASE.entrance },
            index * LINE_STAGGER,
          )
        })
    })
    return () => context.revert()
  }, [ref, reduced, enabled])
}
