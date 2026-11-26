export interface Project {
  id: string
  year: number
  color: string
  geometry: 'sphere' | 'torus' | 'box' | 'icosahedron'
}

// Les textes (titre, catégorie, description) sont dans src/i18n/fr.ts
export const PROJECTS: readonly Project[] = [
  { id: 'aurore', year: 2024, color: '#FF5A1F', geometry: 'sphere' },
  { id: 'nocturne', year: 2024, color: '#6C7BFF', geometry: 'torus' },
  { id: 'cristal', year: 2023, color: '#3FD0C9', geometry: 'box' },
  { id: 'meridien', year: 2023, color: '#F2C14E', geometry: 'icosahedron' },
]
