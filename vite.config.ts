import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg"],
      manifest: {
        name: "Bharosa – scam help for elders",
        short_name: "Bharosa",
        description: "Check messages and calls, get calm help in your language.",
        lang: "hi",
        theme_color: "#25408F",
        background_color: "#F4F3EE",
        display: "standalone",
        start_url: "/",
        icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
        // Android share target: "Share → Bharosa" from WhatsApp/SMS
        share_target: {
          action: "/check",
          method: "GET",
          params: { title: "title", text: "text", url: "url" }
        }
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,json,woff2}"],
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: { cacheName: "fonts", expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 } }
          }
        ]
      }
    })
  ]
});
