import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DURATION, EASE } from '../config/timing'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/** Mot par mot, l'opacité passe de 0.2 à 1 en suivant le défilement */
export function useWordReveal(ref: RefObject<HTMLElement | null>): void {
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const words = element.querySelectorAll<HTMLElement>('[data-word]')
    if (reduced) {
      gsap.set(words, { opacity: 1 })
      return
    }
    let context: gsap.Context | null = null
    try {
      context = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.2 },
        {
          opacity: 1,
          duration: DURATION.base,
          ease: EASE.transition,
          stagger: 0.1,
          scrollTrigger: { trigger: element, start: 'top 75%', end: 'bottom 45%', scrub: true },
        },
      )
      })
    } catch (error) {
      console.error('useWordReveal', error)
      context?.revert()
      words.forEach((word) => (word.style.opacity = ''))
      return
    }
    return () => context?.revert()
  }, [ref, reduced])
}
