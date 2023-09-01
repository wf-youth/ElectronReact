import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";

import path from "path";
/** 路径查找 */
const pathResolve = (dir: string): string => {
  return path.resolve(__dirname, ".", dir);
};

const alias = {
  "@": pathResolve("src"),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: "electron/main.ts",
    }),
  ],
  resolve: {
    extensions: [
      ".mjs",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
      ".less",
      ".scss",
      ".css",
    ],
    alias,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    preprocessorOptions: {
      less: {
        math: "always",
        globalVars: {
          blue: "#ff3040",
        },
      },
    },
  },
  server: {
    cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
    host: "0.0.0.0", // IP配置，支持从IP启动
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
