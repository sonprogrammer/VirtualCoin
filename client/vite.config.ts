import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';
import macrosPlugin from 'vite-plugin-babel-macros'


export default defineConfig({
  define: {
    'process.env': {}, // process.env가 비어 있는 객체로 설정됩니다.
  },
  base: '/',
  plugins: [
    react(),
    macrosPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,  // 개발 모드에서 PWA 활성화
      },
      manifest: {
        name: 'VC 코인 모의 투자',
        short_name: 'VC 코인',
        description: '코인 모의 투자 웹앱',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/Logo.png',  
            type: 'image/png',
          },
          {
            src: '/Logo5.png',  
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  
});
