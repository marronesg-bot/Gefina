import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', //estamos tratando servidor de mesmo origem
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test.setup.ts']
  }
});
