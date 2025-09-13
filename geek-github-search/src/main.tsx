import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from "react-error-boundary";
import ErrorPopUp from './components/ErrorPopUp.tsx';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './style/global.ts';
import { BrowserRouter } from "react-router";
import CustomRoutes from './Routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorPopUp error={error} onClose={resetErrorBoundary} />
      )}
    >
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
