import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { setScrollProgress } from '../scene/store'

gsap.registerPlugin(ScrollTrigger)

let instance: Lenis | null = null
let locked = false

/** Bloque ou libère le défilement, y compris celui de Lenis (overflow seul ne l'arrête pas) */
export function setScrollLocked(value: boolean): void {
  locked = value
  document.documentElement.style.overflow = value ? 'hidden' : ''
  if (value) instance?.stop()
  else instance?.start()
}

function nativeProgress(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? window.scrollY / max : 0
}

/** Défilement fluide synchronisé avec ScrollTrigger, désactivé si mouvement réduit */
export function useLenis(): void {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      const onScroll = (): void => setScrollProgress(nativeProgress())
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    let lenis: Lenis
    try {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    } catch (error) {
      // Lenis ne doit jamais bloquer le défilement : on retombe sur le natif
      console.error('Lenis', error)
      instance = null
      const onScroll = (): void => setScrollProgress(nativeProgress())
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
    instance = lenis
    if (locked) lenis.stop()
    lenis.on('scroll', () => {
      ScrollTrigger.update()
      setScrollProgress(lenis.progress)
    })
    document.fonts?.ready?.then(() => ScrollTrigger.refresh()).catch(() => undefined)
    const tick = (time: number): void => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      instance = null
    }
  }, [reduced])
}

/** Fait défiler jusqu'à une section, avec Lenis si actif, sinon en natif */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return
  if (instance) instance.scrollTo(target, { duration: 1.2 })
  else target.scrollIntoView()
}
