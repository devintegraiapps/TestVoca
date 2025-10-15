import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/TestVoca/', // <-- TEM que ser exatamente o nome do repositório
})
