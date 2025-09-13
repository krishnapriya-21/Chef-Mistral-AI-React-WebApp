import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Replace 'Chef-Mistral-AI-React-WebApp' with your repository name
  base: '/Chef-Mistral-AI-React-WebApp/',
  plugins: [react()],
})
