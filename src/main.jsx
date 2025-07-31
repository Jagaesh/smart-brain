import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'tachyons'
import App from './App.jsx'
import BasicParticles from './components/Particles/BasicParticles'

root = createRoot(document.getElementById('root'))

root.render(
  // <StrictMode>
  <>
    <BasicParticles />
    <App />
  </>
  // </StrictMode>,
)
