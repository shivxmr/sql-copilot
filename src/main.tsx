import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@/styles/globals.css';
import { ThemeProvider } from './components/theme-provider.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
