<script setup lang="ts">
import { Ref } from 'vue';
import { useJwtStore } from '@/stores/jwt'

const config = useRuntimeConfig()

const email = ref()
const password = ref()

const success = ref(false)
const error: Ref<boolean | string> = ref(false)
const timeRedirect = ref(3)

async function submit(e: Event) {

    //nuxt3 fetch
    error.value = false
    const res = await fetch(`${config.API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    }).then(async (res) => ({ res: res, body: await res.json() }))
    if (res.res.status !== 200) {
        console.log(res.body.message)
        //english to fr
        error.value = true
        switch (res.body.message) {
            case 'Email and password are required':
                error.value = "l'email et le mot de passe sont requis"
                break
            case 'User not found':
                error.value = "Utilisateur non trouvé"
                break
            case 'Invalid password':
                error.value = "Mot de passe invalide"
                break
            default:
                error.value = res.body.message
                break
        }
        return null
    }
    success.value = true
    // store token in jwtStore
    const jwtStore = useJwtStore()
    jwtStore.jwt = res.body.token
    //nuxt3 redirect to login vue in 3s
    timeRedirect.value = 3
    while (timeRedirect.value > 1) {
        timeRedirect.value--
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    navigateTo('/')

}
</script>

<template>
    <div>
        <Header />
        <h1>Connection</h1>

        <form @submit.prevent="submit" v-if="success == false">
            <input type="text" name="email" v-model="email" placeholder="email" />
            <input type="password" name="password" v-model="password" placeholder="password" />
            <p v-show="error !== false">{{ error }}</p>
            <input type="submit" value="submit" />
        </form>
        <div v-else>
            <h1>Inscription réussie</h1>
            <p>Redirection a l'acceuil dans {{ timeRedirect }}s...</p>
            <NuxtLink to="/">Acceuil</NuxtLink>
        </div>
    </div>
</template>