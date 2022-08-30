import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export const muiCache = createCache({
  'key': 'mui',
  'prepend': true,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CacheProvider value={muiCache}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CacheProvider>
);
