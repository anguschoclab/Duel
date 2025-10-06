import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: { enabled: true },
      includeAssets: [
        'icons/favicon.ico',
        'icons/apple-touch-icon.png',
        'icons/maskable-512.png'
      ],
      manifest: {
        name: 'Duelmasters',
        short_name: 'Duel',
        description: 'Duel — Arena management, tournaments, and rivalries — playable offline.',
        theme_color: '#0b0f22',
        background_color: '#0b0f22',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
        ]
      }
    })
  ],
  server: { port: 5173 }
})
