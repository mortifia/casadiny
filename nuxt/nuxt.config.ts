// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  typescript: {
    shim: false, // https://nuxt.com/docs/getting-started/installation#prerequisites ()
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    download: true,
    families: {
      'Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200':
        true,
      Inter: true,
    },
  },
  // hmr wss
  vite: {
    server: {
      hmr: {
        port: 24679,
        clientPort: 443,
        path: '/_hmr',
        protocol: 'wss',
      },
    },
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://localhost:3001',
    },
  },
  // watchers: {
  //   webpack: {
  //     aggregateTimeout: 300,
  //     poll: 1000,
  //   },
  // },
  // extractCSS: true,
})
