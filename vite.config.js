import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },

  build: {
    target: 'es2015',
    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },

    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor splitting para melhor cache
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react']
        },
        // Nomes de arquivos com hash para cache
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    // Code splitting
    cssCodeSplit: true,

    // Sem sourcemaps em produção
    sourcemap: false,

    // Chunk size warnings
    chunkSizeWarningLimit: 600,

    // Otimizar assets
    assetsInlineLimit: 4096, // < 4kb vira base64 inline
  },

  // Otimizações de resolução
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  // Otimizar dependências
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: []
  }
})
