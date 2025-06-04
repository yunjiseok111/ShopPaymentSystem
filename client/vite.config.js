import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// @ 경로 사용을 위한 import 추가
import path from 'path';

// const NGROK_URL = 'https://97d4-116-38-221-9.ngrok-free.app';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src'),
    },
  },

  // vue에서 자체적으로 ngrok 임시 고정주소를 보안차단하여 승인해주는 절차
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    historyApiFallback: true,
  }
});
