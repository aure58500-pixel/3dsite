/** Accès sûr à matchMedia : absent ou en échec sur de vieux navigateurs, on renvoie alors null */
function getMql(query: string): MediaQueryList | null {
  try {
    return typeof window.matchMedia === 'function' ? window.matchMedia(query) : null
  } catch {
    return null
  }
}

export function mediaMatches(query: string): boolean {
  return getMql(query)?.matches ?? false
}

/** Écoute les changements d'une media query. Safari < 14 n'a que addListener. */
export function subscribeMedia(query: string, callback: () => void): () => void {
  const mql = getMql(query)
  if (!mql) return () => undefined
  if ('addEventListener' in mql && typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
  }
  const legacy = mql as MediaQueryList
  legacy.addListener(callback)
  return () => legacy.removeListener(callback)
}
