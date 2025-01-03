// content.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import MagicWind from '../components/MagicWind';
import '../styles/magicwind.css';

const initializeApp = () => {
  const container = document.createElement('div');
  container.id = 'magic-wind-root';
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<MagicWind />);
};

initializeApp();
