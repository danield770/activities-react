import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'mpa', // disable history fallback
  server: {
    port: 8080,
    proxy: {
      '/activities': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/#/, ''),
      },
      // '^/activities/.*': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/activities/, ''),
      // },
    },
  },
});
