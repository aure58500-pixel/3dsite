import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { DURATION, EASE } from '../config/timing'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fr } from '../i18n/fr'
import { clearHiddenStates } from '../animations/failsafe'
import { setScrollLocked } from '../animations/useLenis'
import { setRevealed } from '../scene/store'

const COUNT_DURATION = DURATION.slow
const HOLD = 0.2
/** Délai après lequel l'intro est forcée à se terminer si GSAP n'a pas abouti */
const FAILSAFE_MS = 4000

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

    const forceReveal = (): void => {
      clearHiddenStates()
      setRevealed(true)
      setDone(true)
      setScrollLocked(false)
    }

    let completed = false
    const failsafe = window.setTimeout(() => {
      if (completed) return
      console.error('Loader: intro interrompue, affichage forcé')
      forceReveal()
    }, FAILSAFE_MS)

    const counter = { value: 0 }
    let timeline: gsap.core.Timeline
    try {
      setScrollLocked(true)
      timeline = gsap.timeline({
        onComplete: () => {
          completed = true
          setDone(true)
        },
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
    } catch (error) {
      console.error('Loader', error)
      window.clearTimeout(failsafe)
      completed = true
      forceReveal()
      return
    }

    return () => {
      window.clearTimeout(failsafe)
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
      className="fixed inset-0 z-[60] flex items-end justify-between gap-6 bg-bg p-5 md:p-10"
    >
      <p className="eyebrow">{fr.loader.label}</p>
      <p aria-hidden="true" className="font-display text-7xl leading-none tabular-nums tracking-tight md:text-9xl">
        <span ref={countRef}>0</span>
      </p>
    </div>
  )
}
