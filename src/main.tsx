import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Sidebar from './components/Sidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sidebar />
    <App />
  </StrictMode>,
)
