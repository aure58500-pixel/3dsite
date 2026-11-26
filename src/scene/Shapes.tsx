import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { PROJECTS } from '../config/projects'
import { Shape } from './Shape'
import { getSceneState } from './store'
import { poseAt } from './layout'

interface ShapesProps {
  reducedMotion: boolean
  isMobile: boolean
}

export function Shapes({ reducedMotion, isMobile }: ShapesProps) {
  const root = useRef<Group>(null)

  useFrame(() => {
    if (!root.current) return
    root.current.rotation.y = poseAt(getSceneState().scrollProgress).spin
  })

  return (
    <group ref={root} scale={isMobile ? 0.6 : 1}>
      {PROJECTS.map((project, i) => (
        <Shape
          key={project.id}
          index={i}
          geometry={project.geometry}
          color={project.color}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  )
}
