import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync } from 'fs'

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  plugins: [
    {
      name: 'copy-json-files',
      writeBundle() {
        // Create data directory in dist
        mkdirSync('dist/src/data', { recursive: true })
        // Copy JSON files
        copyFileSync('src/data/all_problems.json', 'dist/src/data/all_problems.json')
        copyFileSync('src/data/problems.json', 'dist/src/data/problems.json')
        console.log('✅ Copied JSON data files to dist/')
      }
    }
  ]
})