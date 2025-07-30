import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'tachyons'
import App from './App.jsx'

root = createRoot(document.getElementById('root'))

root.render(
  // <StrictMode>
  <App />
  // </StrictMode>,
)
