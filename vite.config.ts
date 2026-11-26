import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/3dsite/',
  plugins: [react()],
  build: {
    target: 'es2019',
  },
})
