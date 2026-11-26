export const EASE = {
  entrance: 'power3.out',
  transition: 'power2.inOut',
} as const

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 1.2,
} as const

export const STAGGER = 0.08

/** Durée des révélations de titres (dans la plage 0.3 à 1.2 s) */
export const REVEAL_DURATION = 0.9
/** Décalage entre deux lignes d'un titre, en secondes */
export const LINE_STAGGER = 0.06
/** Décalage vertical des apparitions en fondu, en pixels */
export const FADE_DISTANCE = 24
