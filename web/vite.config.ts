import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Import core TS directly — Vite handles the transpilation.
      // Only parser/ evaluator/ engine/ models/ registry/ are imported (not loaders/).
      // Map @core/mod.ts and bare @core imports to the browser-safe entry
      "@core/mod.ts": resolve(__dirname, "../core/browser.ts"),
      "@core/browser.ts": resolve(__dirname, "../core/browser.ts"),
      // Allow specific sub-path imports (parser, evaluator, etc.)
      "@core": resolve(__dirname, "../core"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Dev proxy: forward /api/* to the Deno API server
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
