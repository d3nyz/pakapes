// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'
const sw = process.env.SW === 'true'

export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: 'spa-loading-template.html',
  css: ['~/assets/css/normalize.css', '~/assets/css/main.css', '~/assets/css/animation.css'],
  modules: ['@vite-pwa/nuxt'],
  app: {
    head: {
      title: 'NBS dienesta pakāpes',
      meta: [
        { name: 'description', hid: 'description', content: 'Mērķis ir palīdzēt nacionālo bruņoto spēku kandidātam iemācīties atšķirt Latvijas armijas dienesta pakāpes.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    prerender: {
      routes: ['/', '/list']
    }
  },
  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      name: 'NBS dienesta pakāpes',
      short_name: 'NBS pakāpes',
      description: 'Mērķis ir palīdzēt nacionālo bruņoto spēku kandidātam iemācīties atšķirt Latvijas armijas dienesta pakāpes.',
      theme_color: '#f5f5f5',
      background_color: '#f5f5f5',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      lang: 'lv'
    },
    registerWebManifestInRouteRules: true,
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    },
    includeAssets: ['fonts/*.woff2', 'images/*.png'],
    client: {
      installPrompt: true
    }
  },
  devtools: { enabled: true }
})
