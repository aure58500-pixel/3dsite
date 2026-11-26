import { MathUtils } from 'three'

export type Vec3 = readonly [number, number, number]

export const CLUSTER: readonly Vec3[] = [
  [-2.3, 0.7, 0],
  [2.1, 1.0, -1],
  [-1.3, -1.5, -0.5],
  [1.9, -1.3, 0.5],
]

export const GRID: readonly Vec3[] = [
  [-1.4, 1.2, 0],
  [1.4, 1.2, 0],
  [-1.4, -1.2, 0],
  [1.4, -1.2, 0],
]

export interface ScrollPose {
  /** 0 à 1 : alignement en grille (section projets) */
  grid: number
  /** 0 à 1 : éclatement (section savoir-faire) */
  explode: number
  /** Rotation complète en radians (section studio) */
  spin: number
}

const smooth = (a: number, b: number, x: number): number => MathUtils.smoothstep(x, a, b)

export function poseAt(progress: number): ScrollPose {
  return {
    grid: smooth(0.15, 0.3, progress) - smooth(0.5, 0.6, progress),
    explode: smooth(0.5, 0.62, progress) - smooth(0.75, 0.85, progress),
    spin: smooth(0.75, 0.95, progress) * Math.PI * 2,
  }
}

const EXPLODE_FACTOR = 1.9

export function positionFor(index: number, pose: ScrollPose, out: [number, number, number]): void {
  const c = CLUSTER[index % CLUSTER.length] ?? [0, 0, 0]
  const g = GRID[index % GRID.length] ?? [0, 0, 0]
  const k = 1 + pose.explode * EXPLODE_FACTOR
  out[0] = MathUtils.lerp(c[0], g[0], pose.grid) * k
  out[1] = MathUtils.lerp(c[1], g[1], pose.grid) * k
  out[2] = MathUtils.lerp(c[2], g[2], pose.grid) * k + pose.explode * (index - 1.5) * 1.2
}
