interface ServiceIconProps {
  kind: number
  open: boolean
}

// Chaque icône est une suite de tracés dessinés progressivement (voir .icon-path)
const PATHS: string[][] = [
  ['M4 28 L10 12 L22 24 Z', 'M22 24 L28 6', 'M24 4 L30 8'],
  ['M16 3 L28 10 L28 22 L16 29 L4 22 L4 10 Z', 'M16 16 L28 10', 'M16 16 L4 10', 'M16 16 L16 29'],
  ['M2 16 C6 4 10 4 14 16 S22 28 26 16 S29 10 30 16', 'M2 28 L30 28'],
  ['M4 24 A12 12 0 1 1 28 24', 'M16 24 L22 12', 'M6 28 L26 28'],
]

export function ServiceIcon({ kind, open }: ServiceIconProps) {
  const paths = PATHS[kind % PATHS.length] ?? []
  return (
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-open={open}
      className={open ? 'text-accent' : 'text-muted'}
    >
      {paths.map((d, index) => (
        <path key={d} d={d} pathLength={1} className="icon-path" style={{ animationDelay: `${index * 0.08}s` }} />
      ))}
    </svg>
  )
}
