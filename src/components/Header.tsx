import type { MouseEvent } from 'react'
import { scrollToSection } from '../animations/useLenis'
import { BRAND_NAME } from '../config/brand'
import { fr } from '../i18n/fr'

const LINKS = [
  { id: 'work', label: fr.nav.work, mobile: false },
  { id: 'services', label: fr.nav.services, mobile: false },
  { id: 'about', label: fr.nav.about, mobile: false },
  { id: 'contact', label: fr.nav.contact, mobile: true },
] as const

const linkClass =
  'rounded-sm px-2 py-2 text-sm uppercase tracking-widest text-muted transition-colors duration-fast ease-entrance hover:text-ink'

export function Header() {
  const go = (id: string) => (event: MouseEvent): void => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-bg focus:px-4 focus:py-2"
      >
        {fr.nav.skip}
      </a>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 xl:px-16">
        <a href="#hero" onClick={go('hero')} aria-label={`${BRAND_NAME}, ${fr.nav.home}`} className="font-display text-xl">
          {BRAND_NAME}
        </a>
        <nav aria-label={fr.nav.label}>
          <ul className="flex items-center gap-1 md:gap-4">
            {LINKS.map((link) => (
              <li key={link.id} className={link.mobile ? '' : 'hidden md:block'}>
                <a href={`#${link.id}`} onClick={go(link.id)} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
