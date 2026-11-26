import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Color } from 'three'
import type { PointLight } from 'three'
import { getSceneState } from './store'

export function Lights() {
  const accentLight = useRef<PointLight>(null)
  const target = useMemo(() => new Color(), [])

  useFrame((_, delta) => {
    if (!accentLight.current) return
    target.set(getSceneState().accent)
    accentLight.current.color.lerp(target, 1 - Math.exp(-3 * delta))
  })

  return (
    <>
      {/* Environnement de studio généré par code : aucun fichier HDR externe */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 5, -4]} scale={[10, 4, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} color="#ffe2c7" />
        <Lightformer form="rect" intensity={2} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} color="#cfe0ff" />
        <Lightformer form="circle" intensity={3} position={[0, -4, 3]} scale={5} color="#ffffff" />
      </Environment>
      <directionalLight position={[5, 4, 3]} intensity={2.2} color="#ffb98a" />
      <directionalLight position={[-5, -2, -3]} intensity={0.8} color="#8fb3ff" />
      <pointLight ref={accentLight} position={[0, 0, 4]} intensity={18} distance={14} color="#FF5A1F" />
    </>
  )
}
