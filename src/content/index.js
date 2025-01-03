// content.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import MagicWand from '../components/MagicWand';
import '../styles/magicwand.css';

const initializeApp = () => {
  const container = document.createElement('div');
  container.id = 'magic-wand-root';
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<MagicWand />);
};

initializeApp();
