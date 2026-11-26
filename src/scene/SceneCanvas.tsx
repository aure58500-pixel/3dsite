import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { COLORS } from '../config/design'
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { CameraRig } from './CameraRig'
import { Effects } from './Effects'
import { Lights } from './Lights'
import { Particles } from './Particles'
import { Shapes } from './Shapes'

function isLowPower(isMobile: boolean): boolean {
  return isMobile || (navigator.hardwareConcurrency ?? 8) <= 4
}

/** Rendu actif seulement si l'onglet est au premier plan */
function useTabVisible(): boolean {
  const [visible, setVisible] = useState(!document.hidden)

  useEffect(() => {
    const onVisibility = (): void => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return visible
}

export default function SceneCanvas() {
  const { isMobile, dpr, particleCount } = useDeviceCapabilities()
  const reducedMotion = useReducedMotion()
  const active = useTabVisible()
  const lowPower = isLowPower(isMobile)

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, dpr]}
        camera={{ position: [0, 0, 11.5], fov: 40 }}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[COLORS.bg]} />
        <Lights />
        <Shapes reducedMotion={reducedMotion} isMobile={isMobile} />
        <Particles count={particleCount} reducedMotion={reducedMotion} />
        <CameraRig enabled={!isMobile && !reducedMotion} />
        {!lowPower && <Effects />}
      </Canvas>
    </div>
  )
}
