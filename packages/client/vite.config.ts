import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
