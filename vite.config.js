import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    base: '/contact-me/',
    outDir: 'build',
    rolldownOptions: {
    output: {
      codeSplitting: true, // découpe automatiquement le bundle
    }
  }
  }
})