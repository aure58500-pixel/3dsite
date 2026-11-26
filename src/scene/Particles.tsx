import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferAttribute, BufferGeometry, Color, MathUtils } from 'three'
import type { Points, PointsMaterial } from 'three'
import { getSceneState } from './store'

interface ParticlesProps {
  count: number
  reducedMotion: boolean
}

export function Particles({ count, reducedMotion }: ParticlesProps) {
  const points = useRef<Points>(null)
  const material = useRef<PointsMaterial>(null)
  const target = useMemo(() => new Color(), [])

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Répartition dans une coque sphérique, rayon entre 4 et 11
      const r = 4 + Math.random() * 7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(positions, 3))
    return geo
  }, [count])

  useFrame((_, delta) => {
    const s = getSceneState()
    if (points.current) {
      if (!reducedMotion) points.current.rotation.y += delta * 0.02
      points.current.rotation.x = MathUtils.damp(points.current.rotation.x, s.scrollProgress * 0.8, 2, delta)
    }
    if (material.current) {
      target.set(s.accent)
      material.current.color.lerp(target, 1 - Math.exp(-3 * delta))
    }
  })

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        ref={material}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        color="#ffffff"
      />
    </points>
  )
}
