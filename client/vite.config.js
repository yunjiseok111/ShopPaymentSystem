import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// @ 경로 사용을 위한 import 추가
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src'),
    },
  },
});
