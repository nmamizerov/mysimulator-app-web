import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // eslint-disable-next-line no-undef
  // base: process.env.NODE_ENV === "production" ? "/completing" : "",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
