import { useRef } from 'react'
import { scrollToSection } from '../animations/useLenis'
import { useActiveSection } from '../animations/useActiveSection'
import { useFadeIn } from '../animations/useFadeIn'
import { LineTitle } from '../components/LineTitle'
import { fr } from '../i18n/fr'
import { useSceneSelector } from '../scene/store'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const revealed = useSceneSelector((s) => s.revealed)
  useActiveSection(ref, 'hero')
  useFadeIn(introRef, 0.3, revealed)

  return (
    <section ref={ref} id="hero" aria-labelledby="hero-title" className="relative flex min-h-screen min-h-[100svh] items-end pb-14 pt-32 md:pb-20">
      <div className="grid-12 w-full">
        <p className="eyebrow col-span-12 mb-6 flex items-center gap-3 md:mb-8">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {fr.hero.eyebrow}
        </p>
        <LineTitle
          as="h1"
          id="hero-title"
          text={fr.hero.title}
          enabled={revealed}
          className="col-span-12 font-display text-display lg:col-span-10"
        />
        <div ref={introRef} className="col-span-12 mt-8 flex flex-col gap-8 md:col-span-8 md:mt-12 lg:col-span-5">
          <p className="max-w-md text-lead text-muted md:text-xl">{fr.hero.subtitle}</p>
          <div>
            <button
              type="button"
              data-cursor
              onClick={() => scrollToSection('work')}
              className="btn-ghost"
            >
              {fr.hero.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
