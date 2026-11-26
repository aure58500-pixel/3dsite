import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/fraunces'
import './styles/global.css'
import App from './App'
import { AppErrorBoundary } from './components/AppErrorBoundary'

const root = document.getElementById('root')
if (!root) throw new Error('Élément racine introuvable')

try {
  createRoot(root).render(
    <StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </StrictMode>,
  )
  // Signale au script de secours de index.html que React a pris la main
  root.setAttribute('data-mounted', 'true')
} catch (error) {
  console.error('Échec du rendu initial', error)
  root.textContent = 'Orbite Studio : le site n’a pas pu se charger. Rechargez la page.'
}
