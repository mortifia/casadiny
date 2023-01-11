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
      Roboto: true,
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
