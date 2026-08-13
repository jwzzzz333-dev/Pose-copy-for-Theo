import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 3000
  },
  optimizeDeps: {
    include: [
      '@tensorflow/tfjs-core',
      '@tensorflow/tfjs-converter',
      '@tensorflow/tfjs-backend-webgl',
      '@tensorflow-models/pose-detection',
      'canvas-confetti'
    ]
  },
  build: {
    chunkSizeWarningLimit: 1600
  }
});
