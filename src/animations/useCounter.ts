import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DURATION, EASE } from '../config/timing'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/** Compte de 0 à la valeur cible dans l'élément, une fois visible */
export function useCounter(ref: RefObject<HTMLElement | null>, target: number, suffix: string): void {
  const reduced = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const write = (value: number): void => {
      element.textContent = `${Math.round(value)}${suffix}`
    }
    if (reduced) {
      write(target)
      return
    }
    write(0)
    const counter = { value: 0 }
    const tween = gsap.to(counter, {
      value: target,
      duration: DURATION.slow,
      ease: EASE.entrance,
      onUpdate: () => write(counter.value),
      scrollTrigger: { trigger: element, start: 'top 90%', once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [ref, target, suffix, reduced])
}
