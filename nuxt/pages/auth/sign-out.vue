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
    //get actual url
    const url = window.location.href
    while (timeRedirect.value > 1) {
        timeRedirect.value--
        if (url !== window.location.href) {
            reject()
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    if (url !== window.location.href) {
        reject()
    }
    navigateTo('/')
});
</script>

<template>
    <div id="startAlignAll">

        <Header />
        <div id="authForm">
            <h1>Déconection</h1>
            <!-- <p>Vous avez été déconnecté</p> -->
            <p>Redirection a l'acceuil dans {{ timeRedirect }}s...</p>
            <NuxtLink to="/">Acceuil</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
#startAlignAll {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    height: 100%;
    width: 100%;


}

#authForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: min(10%, 100px);
}
</style>