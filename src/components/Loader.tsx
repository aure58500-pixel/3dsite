import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { DURATION, EASE } from '../config/timing'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fr } from '../i18n/fr'
import { setScrollLocked } from '../animations/useLenis'
import { setRevealed } from '../scene/store'

const COUNT_DURATION = DURATION.slow
const HOLD = 0.2

/** Intro d'environ 2,2 s : compteur de 0 à 100, puis fondu et zoom de caméra */
export function Loader() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reduced) {
      setRevealed(true)
      setDone(true)
      return
    }
    const root = rootRef.current
    const count = countRef.current
    if (!root || !count) return

    setScrollLocked(true)
    const counter = { value: 0 }
    const timeline = gsap.timeline({
      onComplete: () => setDone(true),
    })
    timeline
      .to(counter, {
        value: 100,
        duration: COUNT_DURATION,
        ease: EASE.transition,
        onUpdate: () => {
          count.textContent = String(Math.round(counter.value))
        },
      })
      .call(() => setRevealed(true), undefined, COUNT_DURATION + HOLD)
      .to(root, { opacity: 0, duration: DURATION.slow - 0.4, ease: EASE.transition }, COUNT_DURATION + HOLD)

    return () => {
      timeline.kill()
      setScrollLocked(false)
    }
  }, [reduced])

  useEffect(() => {
    if (done) setScrollLocked(false)
  }, [done])

  if (done) return null

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label={fr.loader.label}
      className="fixed inset-0 z-[60] flex items-end justify-between bg-bg p-6 md:p-10"
    >
      <p className="text-sm uppercase tracking-widest text-muted">{fr.loader.label}</p>
      <p aria-hidden="true" className="font-display text-7xl tabular-nums md:text-9xl">
        <span ref={countRef}>0</span>
      </p>
    </div>
  )
}
