import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig(({command}) => ({
  base: command === 'serve' ? '' : '/dist/',
  root: 'frontend',
  server: command === 'serve' ? {
    port: 5173,
    cors: true,
  } : { middlewareMode: true},
  plugins: [
    react(),
    tailwindcss(),
    // 靜態檔案複製
    viteStaticCopy({
      targets: [
        { src: '../app.dev.gohtml', dest: '.' },
        { src: '../app.prod.gohtml', dest: '.' },
      ]
    })
  ],
  build: {
    outDir: '../cmd/web/dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        // scss: "frontend/scss/app.scss",
        css: "frontend/css/app.css",
        main: path.resolve(__dirname, 'frontend/app.jsx'), // 絕對路徑解析
      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "frontend")
    }
  },
}));