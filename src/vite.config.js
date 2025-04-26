import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Optional: Add specific handling for assets if needed
  build: {
    assetsInlineLimit: 0, // This forces Vite to inline assets if they are under the size limit
  },
  server: {
    open: true, // Auto open the browser on server start
  },
});

