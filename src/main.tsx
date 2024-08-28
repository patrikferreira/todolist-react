import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NavigationProvider } from './NavigationContext';
import Sidebar from './components/Sidebar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavigationProvider>
      <div className='flex'>
        <Sidebar />
        <App />
      </div>
    </NavigationProvider>
  </StrictMode>
);
