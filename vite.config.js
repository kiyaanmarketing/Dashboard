import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update base with your repo name (if using username.github.io, base is '/')
export default defineConfig({
  plugins: [react()],
  base: '/Dashboard/',  // Replace 'Dashboard' with your repo name
})



