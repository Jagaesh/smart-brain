import { useState } from 'react'
import { useCallback } from 'react'
import BasicParticles from './components/Particles/BasicParticles'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import './App.css'

function App() {
  return (
    <div>
      <BasicParticles />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  )
}

export default App
