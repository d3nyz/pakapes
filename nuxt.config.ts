// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'
const sw = process.env.SW === 'true'

const siteURL = process.env.SITE_URL || 'https://pakapes.netlify.app'

import pkg from './package.json'
const clientVersion = pkg.version

export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: 'spa-loading-template.html',
  css: ['~/assets/css/normalize.css', '~/assets/css/main.css', '~/assets/css/animation.css'],
  modules: ['@vite-pwa/nuxt', '@nuxtjs/sitemap', 'nuxt-simple-robots'],
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
      htmlAttrs: {
        lang: 'lv'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  site: {
    name: 'NBS dienesta pakāpes',
    description: 'Aplikācijas mērķis ir palīdzēt nacionālo bruņoto spēku kandidātam iemācīties atšķirt Latvijas armijas dienesta pakāpes.',
    url: siteURL,
    defaultLocale: 'lv',
    indexable: true
  },
  sitemap: {
    include: [ '/**', '/', '/list' ],
    enabled: true,
    urls: [ '/', '/list' ]
  },
  nitro: {
    prerender: {
      routes: ['/', '/list', '/sitemap.xml', '/robots.txt']
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
      lang: 'lv',
      display: 'standalone'
    },
    registerWebManifestInRouteRules: true,
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,json,ico,png,svg,woff2,woff,ttf}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,json,ico,png,svg,woff2,woff,ttf}'],
    },
    includeAssets: ['fonts/*.woff2', 'images/*.png'],
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },
  runtimeConfig: {
    public: {
      version: clientVersion
    }
  },
  devtools: { enabled: true }
})