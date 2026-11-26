import { lazy, Suspense, useEffect, useState } from 'react'
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities'
import { FallbackGradient } from './FallbackGradient'
import { SceneErrorBoundary } from './SceneErrorBoundary'

const SceneCanvas = lazy(() => import('./SceneCanvas'))

function whenIdle(callback: () => void): () => void {
  // Safari n'implémente pas requestIdleCallback
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(callback, { timeout: 1500 })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(callback, 300)
  return () => window.clearTimeout(id)
}

/** Point d'entrée : charge la scène 3D après le premier rendu, sinon dégradé statique */
export function SceneLoader() {
  const { webgl } = useDeviceCapabilities()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!webgl) return
    return whenIdle(() => setReady(true))
  }, [webgl])

  const fallback = <FallbackGradient />
  if (!webgl) return fallback

  return (
    <>
      {fallback}
      {ready && (
        <SceneErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <SceneCanvas />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </>
  )
}
