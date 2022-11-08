import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  return defineConfig({
    base: mode === 'production' ? '/hangman/' : '/',
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      }
    },
    plugins: [react()]
  })
}
