import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //БЕЗ CORS:
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3000/",
  //       changeOrigin: true,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/app/styles/utils/_vars.scss" as *;
          @use "@/app/styles/utils/_mixins.scss" as *;
        `,
      },
    },
  },
});
