import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rolldownOptions: {
    output: {
      codeSplitting: true, // découpe automatiquement le bundle
    }
  }
  }
})