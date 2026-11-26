import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DURATION, EASE, FADE_DISTANCE } from '../config/timing'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { REVEAL_ATTR } from './failsafe'

gsap.registerPlugin(ScrollTrigger)

/** Apparition en fondu avec glissement de 24 px, une seule fois à l'entrée dans le viewport */
export function useFadeIn(ref: RefObject<HTMLElement | null>, delay = 0, enabled = true): void {
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || reduced || !enabled) return
    let context: gsap.Context | null = null
    try {
      element.setAttribute(REVEAL_ATTR, '')
      context = gsap.context(() => {
        gsap.from(element, {
          y: FADE_DISTANCE,
          opacity: 0,
          duration: DURATION.base,
          delay,
          ease: EASE.entrance,
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
    } catch (error) {
      console.error('useFadeIn', error)
      context?.revert()
      element.style.opacity = ''
      element.style.transform = ''
      return
    }
    return () => context?.revert()
  }, [ref, reduced, delay, enabled])
}
