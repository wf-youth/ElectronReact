import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import electron from "vite-plugin-electron";
import autoprefixer from 'autoprefixer';
import viteEslint from 'vite-plugin-eslint';

import path from 'path';
/** 路径查找 */
const pathResolve = (dir: string): string => {
  return path.resolve(__dirname, '.', dir);
};

const alias = {
  '@': pathResolve('src')
};

// electron({
//   entry: "electron/main.ts",
// }),

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'dist',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 取消 console
        drop_debugger: true // 取消 debugger
      }
    }
  },
  server: {
    cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
    host: '0.0.0.0', // IP配置，支持从IP启动
    port: 3000,
    // open: true,
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      less: {
        math: 'always',
        globalVars: {
          blue: '#ff3040'
        }
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['> 1%', 'last 2 versions']
        })
      ]
    }
  },
  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.less',
      '.scss',
      '.css'
    ],
    alias
  },
  plugins: [react()]
});
