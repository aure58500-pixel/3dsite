import { useRef } from 'react'
import { useActiveSection } from '../animations/useActiveSection'
import { useFadeIn } from '../animations/useFadeIn'
import { LineTitle } from '../components/LineTitle'
import { StatCounter } from '../components/StatCounter'
import { fr } from '../i18n/fr'

export function Stats() {
  const ref = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  useActiveSection(ref, 'about')
  useFadeIn(textRef)

  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="py-24 md:py-40">
      <div className="grid-12">
        <LineTitle id="about-title" text={fr.about.title} className="col-span-12 font-display text-4xl md:text-6xl lg:col-span-8" />
        <p ref={textRef} className="col-span-12 mt-8 max-w-xl text-lg text-muted md:col-span-8 lg:col-span-5">
          {fr.about.text}
        </p>
        <dl className="col-span-12 mt-16 grid grid-cols-1 gap-8 xs:grid-cols-3">
          {fr.about.stats.map((stat, index) => (
            <StatCounter key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </dl>
      </div>
    </section>
  )
}
