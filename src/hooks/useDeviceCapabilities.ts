import { BREAKPOINTS, MAX_DPR } from '../config/design'

export interface DeviceCapabilities {
  webgl: boolean
  isMobile: boolean
  dpr: number
  particleCount: number
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    // Libère le contexte de test pour ne pas consommer l'un des ~16 contextes du navigateur
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return Boolean(gl)
  } catch {
    return false
  }
}

function detectCapabilities(): DeviceCapabilities {
  const isMobile = window.innerWidth < BREAKPOINTS.md || window.matchMedia('(pointer: coarse)').matches
  const desktopParticles = 2400
  return {
    webgl: hasWebGL(),
    isMobile,
    dpr: Math.min(window.devicePixelRatio || 1, MAX_DPR),
    particleCount: isMobile ? desktopParticles / 2 : desktopParticles,
  }
}

let cached: DeviceCapabilities | null = null

/** Détection faite une seule fois pour toute l'application */
export function useDeviceCapabilities(): DeviceCapabilities {
  cached ??= detectCapabilities()
  return cached
}
