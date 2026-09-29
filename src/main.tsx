import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/transitions.css';
import './components/components.css';
import './layout/layout.css';
import { App } from './App';
import { AuthProvider } from './auth';
import { LanguageProvider } from './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
