<script setup lang="ts">
import { Ref } from 'vue';
import { useJwtStore } from '@/stores/jwt'

const timeRedirect = ref(3)
// store token in jwtStore
const jwtStore = useJwtStore()
jwtStore.jwt = null
//nuxt3 redirect to login vue in 3s
timeRedirect.value = 3
// while (timeRedirect.value > 1) {
//     timeRedirect.value--
//     await new Promise((resolve) => setTimeout(resolve, 1000))
// }

// await 3s update each second
new Promise(async (resolve, reject) => {
    while (timeRedirect.value > 1) {
        timeRedirect.value--
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    navigateTo('/')
});
</script>

<template>
    <div>
        <Header />
        <h1>Déconection</h1>
        <p>Vous avez été déconnecté</p>
        <p>Redirection a l'acceuil dans {{ timeRedirect }}s...</p>
        <NuxtLink to="/">Acceuil</NuxtLink>
    </div>
</template>