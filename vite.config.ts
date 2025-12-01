import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Listen on all IPs
    port: 8080,       // Force port 8080
    strictPort: true, // Fail if port is busy
    allowedHosts: true // Allow Cloud Run domains (Vite 6)
  },
  preview: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: true
  }
})