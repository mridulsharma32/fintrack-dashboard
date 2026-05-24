import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          charts: ["recharts"],
          router: ["react-router-dom"],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
