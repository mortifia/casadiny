// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false, // https://nuxt.com/docs/getting-started/installation#prerequisites ()
  },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
})
