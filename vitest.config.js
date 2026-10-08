import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

// Tailwind's plugin is left out on purpose: the tests check what a page says
// and links to, not how it looks.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: { url: 'http://localhost:5173' },
    },
    globals: true,
    setupFiles: ['./tests/setup.js'],
    // The first test to mount a big view pays for compiling it too.
    testTimeout: 20000,
    hookTimeout: 20000,
  },
})
