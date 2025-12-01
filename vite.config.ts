import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This effectively replaces 'process.env.API_KEY' with the actual value string during build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: true
  },
  preview: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: true
  }
})