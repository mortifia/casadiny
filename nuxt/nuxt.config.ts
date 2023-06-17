// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-medusa',
    '@nuxtjs/color-mode',
  ],
  medusa: {
    server: true,

  },
})