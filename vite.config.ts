import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
  ],
  server: {
    port: 3000 
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
})
