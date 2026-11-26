import { BRAND_EMAIL, BRAND_NAME } from '../config/brand'
import { fr } from '../i18n/fr'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-8 text-sm text-muted md:flex-row md:justify-between md:px-10 xl:px-16">
        <p>
          &copy; {new Date().getFullYear()} {BRAND_NAME}. {fr.footer.rights}
        </p>
        <a href={`mailto:${BRAND_EMAIL}`} className="hover:text-ink">
          {BRAND_EMAIL}
        </a>
      </div>
    </footer>
  )
}
