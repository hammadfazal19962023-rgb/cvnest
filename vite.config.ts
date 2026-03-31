import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-proposal-optional-chaining']
      }
    }),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    external: ["html2pdf.js", "pdfjs-dist"],
    noExternal: ["sonner"],
  },
  build: {
    target: "es2015",
    emptyOutDir: true,
  },
}));