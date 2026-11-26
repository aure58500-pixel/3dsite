import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { DURATION, EASE } from '../config/timing'
import { useReducedMotion } from '../hooks/useReducedMotion'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const INTERACTIVE = 'a, button, [data-cursor]'

/** Point qui suit la souris avec retard, uniquement sur appareils à pointeur précis */
export function Cursor() {
  const reduced = useReducedMotion()
  const [enabled] = useState(() => window.matchMedia(FINE_POINTER).matches)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!enabled || reduced || !dot) return

    const moveX = gsap.quickTo(dot, 'x', { duration: 0.5, ease: EASE.entrance })
    const moveY = gsap.quickTo(dot, 'y', { duration: 0.5, ease: EASE.entrance })

    let visible = false
    const onMove = (event: PointerEvent): void => {
      if (!visible) {
        visible = true
        gsap.to(dot, { opacity: 1, duration: DURATION.fast })
      }
      moveX(event.clientX)
      moveY(event.clientY)
    }
    const onOver = (event: PointerEvent): void => {
      const target = event.target instanceof Element ? event.target : null
      const scale = target?.closest(INTERACTIVE) ? 3.5 : 1
      gsap.to(dot, { scale, duration: DURATION.fast, ease: EASE.entrance, overwrite: 'auto' })
    }
    const onLeave = (): void => {
      visible = false
      gsap.to(dot, { opacity: 0, duration: DURATION.fast })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(dot)
    }
  }, [enabled, reduced])

  if (!enabled || reduced) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] -ml-2 -mt-2 h-4 w-4 rounded-full bg-accent opacity-0 mix-blend-difference"
    />
  )
}
