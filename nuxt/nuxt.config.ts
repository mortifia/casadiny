// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: false,
    typeCheck: true
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],
  runtimeConfig: {
    public : {
      medusaUrl: 'http://localhost:1000'
    }
  },
})
