import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const base = process.env.VITE_BASE ?? "/Fruitbox/";

export default defineConfig({
  base,
  resolve: {
    conditions: ["onnxruntime-web-use-extern-wasm", "import", "module", "browser", "default"],
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["fruitbox_policy.onnx", "wheels/*.whl"],
      manifest: {
        name: "Fruit Box",
        short_name: "Fruitbox",
        description: "Clear numbered fruits that sum to 10",
        theme_color: "#1a1a1a",
        background_color: "#1a1a1a",
        display: "standalone",
        start_url: base,
        icons: [
          {
            src: "pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,whl,wasm,mjs}"],
        maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/pyodide\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "pyodide-cdn",
              expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/huggingface\.co\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "huggingface-models",
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  preview: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
