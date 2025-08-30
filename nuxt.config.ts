export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  features: {
    inlineStyles: true,
  },
  app: {
    head: {
      title: 'Pokemon Finder',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/pokeball.svg' }
      ]
    }
  }
})