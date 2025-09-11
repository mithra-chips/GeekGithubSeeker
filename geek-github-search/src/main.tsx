import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from "react-error-boundary";
import ErrorPopUp from './components/ErrorPopUp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorPopUp error={error} onClose={resetErrorBoundary} />
      )}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
