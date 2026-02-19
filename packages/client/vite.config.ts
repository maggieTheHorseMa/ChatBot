import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
 proxy: {
      // Use '/api' as the key to match fetch('/api/...')
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
  }
}
})
