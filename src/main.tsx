import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ProgressProvider } from './lib/useProgress';
import { TermDialogProvider } from './lib/useTermDialog';
import './styles/global.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root elementi tapılmadı');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ProgressProvider>
        <TermDialogProvider>
          <App />
        </TermDialogProvider>
      </ProgressProvider>
    </BrowserRouter>
  </StrictMode>
);
