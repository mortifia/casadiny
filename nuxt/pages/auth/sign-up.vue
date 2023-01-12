<script setup lang="ts">
import { Ref } from 'vue';
const config = useRuntimeConfig()

const email = ref()
const password = ref()

const success = ref(false)
const error: Ref<boolean | string> = ref(false)
const timeRedirect = ref(3)

async function submit(e: Event) {
    //nuxt3 fetch
    error.value = false
    const res = await fetch(`${config.API_URL}/auth/signup`, {
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
            case 'Email already exists':
                error.value = "l'email existe déjà"
                break
            default:
                error.value = res.body.message
                break
        }
        return null
    }
    success.value = true
    //nuxt3 redirect to login vue in 3s
    timeRedirect.value = 3
    while (timeRedirect.value > 1) {
        timeRedirect.value--
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    navigateTo('/auth/sign-in')

}
</script>

<template>
    <div>
        <Header />
        <h1>Inscription</h1>

        <form @submit.prevent="submit" v-if="success == false">
            <input type="text" name="email" v-model="email" placeholder="email" />
            <input type="password" name="password" v-model="password" placeholder="password" />
            <p v-show="error !== false">{{ error }}</p>
            <input type="submit" value="submit" />
        </form>
        <div v-else>
            <h1>Inscription réussie</h1>
            <p>Redirection a la page de connection dans {{ timeRedirect }}s...</p>
            <NuxtLink to="/auth/sign-in">Login</NuxtLink>
        </div>
    </div>
</template>