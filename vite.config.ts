import { defineConfig } from 'vite'

export default defineConfig({
  base: '/The-Cipher-of-Lost-Pages/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})