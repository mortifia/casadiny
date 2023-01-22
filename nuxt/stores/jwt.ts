import { defineStore, storeToRefs } from 'pinia'

export const useJwtStore = defineStore('jwt', {
  state: () => ({
    jwt: null,
  }),
  persist: true,
})
