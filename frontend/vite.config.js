import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files based on the mode
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      port: 8080,
      strictPort: true,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL || 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
  }
})
