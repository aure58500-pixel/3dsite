import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { scrollToSection, setScrollLocked } from '../animations/useLenis'
import { BRAND_NAME } from '../config/brand'
import { fr } from '../i18n/fr'

const LINKS = [
  { id: 'work', label: fr.nav.work },
  { id: 'services', label: fr.nav.services },
  { id: 'about', label: fr.nav.about },
  { id: 'contact', label: fr.nav.contact },
] as const

const MENU_ID = 'menu-mobile'
const FOCUSABLE = 'a[href], button'
const DESKTOP_QUERY = '(min-width: 768px)'

const linkClass =
  'rounded-sm px-2 py-2 text-eyebrow uppercase text-muted transition-colors duration-fast ease-entrance hover:text-ink'

export function Header() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Verrouille le défilement tant que le menu est ouvert, sans toucher au verrou du loader au montage
  useEffect(() => {
    if (!open) return
    setScrollLocked(true)
    return () => setScrollLocked(false)
  }, [open])

  // Referme le menu quand on passe en affichage large
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)
    const onChange = (): void => {
      if (query.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const go = (id: string) => (event: MouseEvent): void => {
    event.preventDefault()
    if (open) {
      // Lenis est arrêté tant que le menu est ouvert : on le relance avant de défiler
      setOpen(false)
      setScrollLocked(false)
    }
    scrollToSection(id)
  }

  const closeMenu = (): void => {
    setOpen(false)
    toggleRef.current?.focus()
  }

  const onKeyDown = (event: KeyboardEvent): void => {
    if (!open) return
    if (event.key === 'Escape') {
      event.stopPropagation()
      closeMenu()
      return
    }
    if (event.key !== 'Tab' || !headerRef.current) return
    const items = Array.from(headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (item) => item.offsetParent !== null,
    )
    const first = items[0]
    const last = items[items.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <header ref={headerRef} onKeyDown={onKeyDown} className="fixed inset-x-0 top-0 z-40">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:bg-bg focus:px-4 focus:py-2"
      >
        {fr.nav.skip}
      </a>
      <div aria-hidden="true" className="absolute inset-0 border-b border-line bg-bg/70 backdrop-blur-md" />
      <div className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-2 md:px-10 md:py-3 xl:px-16">
        <a
          href="#hero"
          onClick={go('hero')}
          aria-label={`${BRAND_NAME}, ${fr.nav.home}`}
          className="inline-flex min-h-11 items-center font-display text-xl tracking-tight"
        >
          {BRAND_NAME}
          <span aria-hidden="true" className="ml-1 h-1.5 w-1.5 rounded-full bg-accent" />
        </a>
        <nav aria-label={fr.nav.label} className="hidden md:block">
          <ul className="flex items-center gap-4">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={go(link.id)} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 text-eyebrow uppercase text-ink md:hidden"
        >
          {open ? fr.nav.menuClose : fr.nav.menuOpen}
        </button>
      </div>
      {open && (
        <nav
          id={MENU_ID}
          aria-label={fr.nav.label}
          className="fixed inset-0 z-0 flex flex-col justify-center bg-bg px-5 pb-10 pt-20 md:hidden"
        >
          <ul className="m-0 list-none p-0">
            {LINKS.map((link, index) => (
              <li key={link.id} className="border-t border-line last:border-b">
                <a
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  className="flex min-h-[64px] items-baseline gap-4 py-4 font-display text-4xl tracking-tight"
                >
                  <span aria-hidden="true" className="text-eyebrow text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
