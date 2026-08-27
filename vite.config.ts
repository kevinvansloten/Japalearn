import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Japalearn/',
  plugins: [react()],
  server: { open: true },
});
