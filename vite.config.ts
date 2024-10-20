import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 导入 node.js path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { // 配置路径别名
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/admin'), // 可选：重写路径
      },
      '/user': {
        target: 'http://localhost:8080', // 基本 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, '/user'), // 保持路径不变
      },
      '/notify': {
        target: 'http://localhost:8080', // 基本 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/notify/, '/notify'), // 保持路径不变
      },
    },
  },
})
