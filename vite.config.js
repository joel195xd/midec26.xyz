import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        bio: resolve(__dirname, 'bio.html'),
        musica: resolve(__dirname, 'musica.html'),
        galeria: resolve(__dirname, 'galeria.html'),
        tour: resolve(__dirname, 'tour.html'),
        contacto: resolve(__dirname, 'contacto.html'),
      },
    },
  },
})
