import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "./", // ✅ ensures assets load correctly on Vercel & subpaths
    server: {
      port: 3000,
      host: "0.0.0.0"
    },
    plugins: [react()],
    define: {
      // ✅ expose selected env vars safely for client use
      __APP_ENV__: JSON.stringify(env.NODE_ENV || mode),
      __GEMINI_API_KEY__: JSON.stringify(env.GEMINI_API_KEY || "")
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, ".")
      }
    },
    build: {
      outDir: "dist", // ✅ matches Vercel’s expected output dir
      emptyOutDir: true,
      sourcemap: false
    }
  };
});
