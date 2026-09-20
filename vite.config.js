import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Required so the browser can use SharedArrayBuffer, which the
      // AI background-removal model (onnxruntime-web, threaded WASM) needs.
      // 'credentialless' (not 'require-corp') is used so it doesn't break
      // loading Google Fonts and other cross-origin assets that don't send CORP headers.
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
  },
  preview: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
  },
})
