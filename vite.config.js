import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/skyline-news/',
  build: {
    outDir: 'dist',
    assetsDir: '',  // Assets na raiz do dist
    sourcemap: false,
    cssCodeSplit: false,  // CSS em um único arquivo
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: '[name].[ext]',  // Nomes simples
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js'
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})