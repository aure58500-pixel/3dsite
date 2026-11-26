import { useSyncExternalStore } from 'react'
import { COLORS } from '../config/design'
import { PROJECTS } from '../config/projects'

export type SectionId = 'hero' | 'work' | 'services' | 'about' | 'contact'

export const SECTION_ACCENTS: Record<SectionId, string> = {
  hero: COLORS.accent,
  work: COLORS.accent,
  services: '#6C7BFF',
  about: '#3FD0C9',
  contact: COLORS.accent,
}

export interface SceneState {
  /** Progression de défilement globale, de 0 à 1 */
  scrollProgress: number
  activeSection: SectionId
  /** Index du projet survolé dans PROJECTS, ou null */
  hoveredProject: number | null
  /** Couleur d'accent courante (cible de la transition) */
  accent: string
  /** Vrai une fois le loader terminé : déclenche le zoom d'entrée de la caméra */
  revealed: boolean
}

let state: SceneState = {
  scrollProgress: 0,
  activeSection: 'hero',
  hoveredProject: null,
  accent: SECTION_ACCENTS.hero,
  revealed: false,
}

const listeners = new Set<() => void>()

function computeAccent(section: SectionId, hovered: number | null): string {
  const project = hovered === null ? undefined : PROJECTS[hovered]
  return project ? project.color : SECTION_ACCENTS[section]
}

function commit(next: SceneState): void {
  state = next
  listeners.forEach((listener) => listener())
}

export function getSceneState(): SceneState {
  return state
}

export function subscribeScene(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/**
 * La progression change à chaque frame de défilement : on mute l'objet
 * sans notifier React. Le rendu 3D la lit via getSceneState() dans useFrame.
 */
export function setScrollProgress(progress: number): void {
  state.scrollProgress = Math.min(1, Math.max(0, progress))
}

export function setActiveSection(section: SectionId): void {
  if (section === state.activeSection) return
  commit({ ...state, activeSection: section, accent: computeAccent(section, state.hoveredProject) })
}

export function setHoveredProject(index: number | null): void {
  if (index === state.hoveredProject) return
  commit({ ...state, hoveredProject: index, accent: computeAccent(state.activeSection, index) })
}

export function setRevealed(revealed: boolean): void {
  if (revealed === state.revealed) return
  commit({ ...state, revealed })
}

export function useSceneSelector<T>(selector: (s: SceneState) => T): T {
  return useSyncExternalStore(subscribeScene, () => selector(state))
}
