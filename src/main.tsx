import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/fraunces'
import './styles/global.css'
import App from './App'

const root = document.getElementById('root')
if (!root) throw new Error('Élément racine introuvable')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
