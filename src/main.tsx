import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/custom.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme.context.tsx';
import { PixieProvider } from './contexts/pixie.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PixieProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </PixieProvider>
  </StrictMode>,
)
