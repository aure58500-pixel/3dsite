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
    <section ref={ref} id="hero" aria-labelledby="hero-title" className="relative flex min-h-screen min-h-[100svh] items-end pb-16 pt-32">
      <div className="grid-12 w-full">
        <p className="col-span-12 mb-6 text-sm uppercase tracking-widest text-accent">{fr.hero.eyebrow}</p>
        <LineTitle
          as="h1"
          id="hero-title"
          text={fr.hero.title}
          enabled={revealed}
          className="col-span-12 font-display text-5xl leading-[1.02] xs:text-6xl lg:col-span-10 lg:text-8xl"
        />
        <div ref={introRef} className="col-span-12 mt-10 flex flex-col gap-8 md:col-span-8 lg:col-span-5">
          <p className="text-lg text-muted md:text-xl">{fr.hero.subtitle}</p>
          <div>
            <button
              type="button"
              data-cursor
              onClick={() => scrollToSection('work')}
              className="rounded-full border border-ink px-8 py-3 transition-colors duration-base ease-transition hover:bg-ink hover:text-bg"
            >
              {fr.hero.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
