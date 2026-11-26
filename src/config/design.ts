export const COLORS = {
  bg: '#07070A',
  ink: '#EDEDE8',
  accent: '#FF5A1F',
  surface: '#0D0D12',
} as const

export const BREAKPOINTS = {
  xs: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const

export const MAX_DPR = 1.5

/** Échelle typographique : miroir des tailles `text-*` de tailwind.config.ts */
export const TYPE_SCALE = ['eyebrow', 'lead', 'statement', 'title', 'display'] as const

/** Rythme vertical des sections : classe `.section-y` de global.css (96px mobile, 160px dès 768px) */
export const SECTION_PADDING = { mobile: 96, desktop: 160 } as const
