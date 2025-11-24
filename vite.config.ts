import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // overlay: false, // uncomment to hide Vite's red error overlay
  },
});
