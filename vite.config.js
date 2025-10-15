import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';


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
    }),
    viteCompression({
      threshold: 50000 // 50kb
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    outDir: '../cmd/web/dist',
    emptyOutDir: true,
    manifest: true,

    // minify -> terser start
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // minify -> terser end

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