// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: 'spa-loading-template.html',
  css: ['~/assets/css/normalize.css', '~/assets/css/main.css'],
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
  pwa: {
    manifest: {
      name: 'NBS dienesta pakāpes',
      short_name: 'NBS dienesta pakāpes',
      description: 'Mērķis ir palīdzēt nacionālo bruņoto spēku kandidātam iemācīties atšķirt Latvijas armijas dienesta pakāpes.',
      theme_color: '#9e3039',
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
      ]
    },
    registerWebManifestInRouteRules: true
  },
  devtools: { enabled: true }
})
