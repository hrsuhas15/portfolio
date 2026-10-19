import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * GitHub Pages has no server-side rewrites. Serving a copy of index.html as
 * 404.html lets deep links (e.g. /projects/some-slug) boot the SPA, after
 * which Vue Router resolves the URL on the client.
 */
function spaFallback() {
  let outDir = 'dist'
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    async closeBundle() {
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Repository name for project pages; set VITE_BASE=/ for a user site or custom domain.
  const base = env.VITE_BASE || '/suhashr-portfolio/'

  return {
    base,
    plugins: [vue(), spaFallback()],
    resolve: {
      alias: { '@': resolve(import.meta.dirname, 'src') },
    },
  }
})
