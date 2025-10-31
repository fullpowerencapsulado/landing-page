import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [react()],

  define: {
    'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
  },

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
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        passes: 3,
        dead_code: true,
        unused: true,
        side_effects: false
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          // Code splitting mais agressivo
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            return 'vendor';
          }
        },
        // Nomes de arquivos com hash para cache
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false
      }
    },

    // Code splitting
    cssCodeSplit: true,

    // Sem sourcemaps em produção
    sourcemap: false,

    // Chunk size warnings
    chunkSizeWarningLimit: 500,

    // Otimizar assets
    assetsInlineLimit: 2048, // < 2kb vira base64 inline (reduzido para menos requisições)

    // Reportar tamanho comprimido
    reportCompressedSize: true
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
}
})
