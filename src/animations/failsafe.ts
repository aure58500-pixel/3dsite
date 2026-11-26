import gsap from 'gsap'

/** Marque posée sur les éléments dont l'état initial caché est appliqué par GSAP */
export const REVEAL_ATTR = 'data-reveal-target'

/**
 * Dernier recours si l'intro n'aboutit pas : retire les états cachés posés par GSAP
 * (opacité, décalage) pour que le contenu reste lisible.
 */
export function clearHiddenStates(): void {
  try {
    gsap.set(`[${REVEAL_ATTR}], [data-line-word] > *`, { clearProps: 'opacity,visibility,transform' })
  } catch {
    document.querySelectorAll<HTMLElement>(`[${REVEAL_ATTR}], [data-line-word] > *`).forEach((el) => {
      el.style.opacity = ''
      el.style.visibility = ''
      el.style.transform = ''
    })
  }
}
