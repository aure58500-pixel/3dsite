import type { Project } from '../config/projects'

interface ProjectVisualProps {
  project: Project
  className?: string
}

/** Visuel généré en CSS à partir de la couleur du projet, sans image externe */
export function ProjectVisual({ project, className = '' }: ProjectVisualProps) {
  const { color, geometry } = project
  const shape: Record<Project['geometry'], string> = {
    sphere: '9999px',
    torus: '9999px',
    box: '18%',
    icosahedron: '50% 50% 50% 50% / 60% 60% 40% 40%',
  }
  const hole = geometry === 'torus' ? 'radial-gradient(circle, #07070A 28%, transparent 29%), ' : ''

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 25% 20%, ${color}55, transparent 55%), radial-gradient(circle at 80% 90%, ${color}33, transparent 50%), #0D0D12`,
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 rotate-12 transition-transform duration-slow ease-entrance group-hover:rotate-[24deg] group-hover:scale-110"
        style={{
          borderRadius: shape[geometry],
          background: `${hole}conic-gradient(from 210deg, ${color}, #EDEDE8 30%, ${color}66 55%, ${color} 80%, #EDEDE8)`,
          boxShadow: `0 0 80px ${color}66, inset 0 0 40px #07070A66`,
        }}
      />
    </div>
  )
}
