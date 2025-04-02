

import './App.css';
import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
const container = document.getElementById('root');
const root = createRoot(container!); // The '!' tells TypeScript that container exists

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);