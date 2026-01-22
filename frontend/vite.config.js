import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    host: true, // 允許外部訪問
    port: 5173,
    watch: {
      usePolling: true, // 在 Docker 容器中需要啟用輪詢
    },
    hmr: {
      overlay: true, // 顯示錯誤覆蓋層
    },
  },
});
