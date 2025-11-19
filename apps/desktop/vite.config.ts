import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@gemini-reviewer/core': path.resolve(__dirname, '../../packages/core/src'),
      '@gemini-reviewer/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
  // Tauri expects a relative base path
  base: './',
  // Build for Tauri
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  // Tauri uses a different server config
  server: {
    port: 5174,
    strictPort: true,
  },
});
