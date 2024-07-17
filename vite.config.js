import react from "@vitejs/plugin-react";
import rollupReplace from "@rollup/plugin-replace";
// import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Thymbol",
    short_name: "Thymbol",
    description: "Thymbol",
    icons: [{
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
      purpose: 'apple touch icon',
    },
    {
      src: '/maskable_icon.png',
      sizes: '212x212',
      type: 'image/png',
      purpose: 'any maskable',
    }
    ],
    theme_color: '#ffffff',
    background_color: '#0C9AD6',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  },
}

export default defineConfig({
  resolve: {
    alias: [
      {
        // "@": path.resolve(__dirname, "./src"),
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },

  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
    }),
    react(),
    // reactRefresh(),
    splitVendorChunkPlugin(),
    VitePWA(manifestForPlugIn),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
});
