import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './ui/App';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Suspense fallback={<div style={{padding:16}}>Loading…</div>}>
    <App/>
  </Suspense>
);
