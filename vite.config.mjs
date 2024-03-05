import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   open: true,
  //   port: 5555,
  // },
  // build: {
  //   minify: true,
  //   chunkSizeWarningLimit: 1500,
  // }
})
