import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Load environment variables from .env files
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd())

  // You can now access the environment variable
  console.log(env.VITE_BACKEND_URL) // Will log the VITE_BACKEND_URL if it's set

  return {
    plugins: [react()],
    server: {
      port: 8080,
      strictPort: true,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL || 'http://localhost:8000', // Use env.VITE_BACKEND_URL
          changeOrigin: true,
        },
      },
    },
  }
})
