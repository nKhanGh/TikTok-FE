import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalStypes from './components/GlobalStyles/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStypes>
      <App />
    </GlobalStypes>
  </StrictMode>,
)
