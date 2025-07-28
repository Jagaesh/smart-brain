import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { loadAll } from '@tsparticles/all'
import './App.css'
import BasicParticles from './components/Particles'

const particlesOptions = {
  fullScreen: {
    enable: true,
    zIndex: -1, // pour que les particules soient en fond
  },
  particles: {
    number: { value: 60 },
    size: { value: 3 },
    move: { enable: true, speed: 2 },
    links: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
  },
}

function App() {
  return (
    <div className="App">
      <BasicParticles />
      <h1 style={{ position: 'relative', zIndex: 1, color: 'white' }}>
        Hello tsParticles 👋
      </h1>
    </div>
  )
}

export default App
