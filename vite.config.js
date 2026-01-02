import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // Optimasi build untuk production
  build: {
    outDir: 'dist',
    sourcemap: false, // Matikan sourcemap untuk hemat size & keamanan
    minify: 'terser',
  }
})
