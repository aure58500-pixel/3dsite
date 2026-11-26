import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { getSceneState } from './store'

const BASE_Z = 7.5
const INTRO_OFFSET = 4

interface CameraRigProps {
  enabled: boolean
}

/** Parallaxe douce : la caméra suit la souris avec amortissement */
export function CameraRig({ enabled }: CameraRigProps) {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  useFrame(({ camera }, delta) => {
    const targetZ = BASE_Z + (getSceneState().revealed ? 0 : INTRO_OFFSET)
    camera.position.z = MathUtils.damp(camera.position.z, targetZ, 2.2, delta)
    camera.position.x = MathUtils.damp(camera.position.x, mouse.current.x * 0.6, 3, delta)
    camera.position.y = MathUtils.damp(camera.position.y, -mouse.current.y * 0.4, 3, delta)
    camera.lookAt(0, 0, 0)
  })

  return null
}
