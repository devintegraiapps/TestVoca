// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Elemento #root não encontrado no index.html');
}

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
