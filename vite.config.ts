import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('/postprocessing/') || id.includes('@react-three/postprocessing')) return 'postprocessing'
          if (id.includes('@react-three/') ) return 'r3f'
          if (id.includes('/three/')) return 'three'
          if (id.includes('/gsap/')) return 'gsap'
          return undefined
        },
      },
    },
  },
})
