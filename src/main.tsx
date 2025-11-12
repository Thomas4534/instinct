import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import FooterPage from './FooterPage.tsx'
import Hero from './Hero.tsx'
import Sections from './Sections.tsx'

import './index.css'

// You can switch between App or FooterPage here
// For now, render App, but FooterPage is available too
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Hero />
    <App />
    <Sections />
    <FooterPage />
  </React.StrictMode>,
)
