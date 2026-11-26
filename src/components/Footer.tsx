import { BRAND_EMAIL, BRAND_NAME } from '../config/brand'
import { fr } from '../i18n/fr'

export function Footer() {
  return (
    <footer className="hairline relative z-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10 md:py-14 xl:px-16">
        <div className="flex flex-col gap-2">
          <p className="font-display text-2xl tracking-tight">
            {BRAND_NAME}
            <span aria-hidden="true" className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          </p>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. {fr.footer.rights}
          </p>
        </div>
        <a
          href={`mailto:${BRAND_EMAIL}`}
          className="inline-flex min-h-11 items-center rounded-sm text-base text-ink underline decoration-line underline-offset-4 transition-colors duration-fast hover:decoration-accent"
        >
          {BRAND_EMAIL}
        </a>
      </div>
    </footer>
  )
}
