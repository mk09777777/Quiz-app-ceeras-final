import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  server: {
    port: 5000, // Running Vite on port 5000
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Change this to your backend server port
        changeOrigin: true,
        secure: false, // Use false if backend is using HTTP instead of HTTPS
        // rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Removes "/api" from request
      },
    },
  },
});
