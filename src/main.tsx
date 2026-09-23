import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LocaleProvider } from './i18n/useLocale';
import { ProgressProvider } from './lib/useProgress';
import { TermDialogProvider } from './lib/useTermDialog';
import './styles/global.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root element not found');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <LocaleProvider>
        <ProgressProvider>
          <TermDialogProvider>
            <App />
          </TermDialogProvider>
        </ProgressProvider>
      </LocaleProvider>
    </BrowserRouter>
  </StrictMode>
);
