import { useRef } from 'react'
import { useActiveSection } from '../animations/useActiveSection'
import { useFadeIn } from '../animations/useFadeIn'
import { ContactForm } from '../components/ContactForm'
import { LineTitle } from '../components/LineTitle'
import { fr } from '../i18n/fr'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  useActiveSection(ref, 'contact')
  useFadeIn(formRef, 0.1)

  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="section-y">
      <div className="grid-12">
        <div className="col-span-12 mb-12 lg:col-span-5 lg:mb-0">
          <LineTitle id="contact-title" text={fr.contact.title} className="font-display text-title" />
          <p className="mt-5 max-w-sm text-lead text-muted">{fr.contact.intro}</p>
        </div>
        <div ref={formRef} className="col-span-12 lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
