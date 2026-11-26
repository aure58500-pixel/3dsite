import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { MathUtils } from 'three'
import type { Group } from 'three'
import type { Project } from '../config/projects'
import { createDeformMaterial } from './deformMaterial'
import { getSceneState } from './store'
import { poseAt, positionFor } from './layout'

interface ShapeProps {
  index: number
  geometry: Project['geometry']
  color: string
  reducedMotion: boolean
}

export function Shape({ index, geometry, color, reducedMotion }: ShapeProps) {
  const group = useRef<Group>(null)
  const { material, uniforms } = useMemo(
    () => createDeformMaterial(index % 2 === 0, color),
    [index, color],
  )
  const pos = useMemo<[number, number, number]>(() => [0, 0, 0], [])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const s = getSceneState()
    positionFor(index, poseAt(s.scrollProgress), pos)
    g.position.x = MathUtils.damp(g.position.x, pos[0], 4, delta)
    g.position.y = MathUtils.damp(g.position.y, pos[1], 4, delta)
    g.position.z = MathUtils.damp(g.position.z, pos[2], 4, delta)

    if (!reducedMotion) {
      g.rotation.y += delta * (0.25 + index * 0.07)
      g.rotation.x += delta * 0.12
    }

    const hovered = s.hoveredProject === index
    uniforms.uDeform.value = MathUtils.damp(uniforms.uDeform.value, hovered ? 1 : 0, 5, delta)
    uniforms.uTime.value += delta
    const scale = MathUtils.damp(g.scale.x, hovered ? 1.15 : 1, 5, delta)
    g.scale.setScalar(scale)
  })

  return (
    <group ref={group}>
      {geometry === 'box' ? (
        <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.2} smoothness={6}>
          <primitive object={material} attach="material" />
        </RoundedBox>
      ) : (
        <mesh>
          {geometry === 'sphere' && <sphereGeometry args={[1, 96, 96]} />}
          {geometry === 'torus' && <torusGeometry args={[0.85, 0.34, 64, 160]} />}
          {geometry === 'icosahedron' && <icosahedronGeometry args={[1.05, 8]} />}
          <primitive object={material} attach="material" />
        </mesh>
      )}
    </group>
  )
}
