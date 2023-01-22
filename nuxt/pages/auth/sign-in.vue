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
    //nuxt get actual url
    const url = window.location.href
    //nuxt3 redirect to login vue in 3s
    timeRedirect.value = 3
    while (timeRedirect.value > 1) {
        timeRedirect.value--
        // console.log(`${url} ?= ${window.location.href}`)
        if (url !== window.location.href) {
            return null
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    if (url !== window.location.href) {
        return null
    }
    navigateTo('/')

}
</script>

<template>
    <div id="startAlignAll">
        <Header />
        <div id="authForm">


            <form @submit.prevent="submit" v-if="success == false">
                <h1>Connexion</h1>
                <div class="line">
                    <label for="email">Email : </label>
                    <input type="text" name="email" v-model="email" placeholder="email" />
                </div>
                <div class="line">
                    <label for="password">Mot de passe : </label>
                    <input type="password" name="password" v-model="password" placeholder="password" />
                </div>
                <p v-show="error !== false">{{ error }}</p>
                <input type="submit" value="Connexion" class="button" />
            </form>
            <div v-else>
                <h1>Inscription réussie</h1>
                <p>Redirection a l'acceuil dans {{ timeRedirect }}s...</p>
                <NuxtLink to="/">Acceuil</NuxtLink>
            </div>
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

h1 {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
}

.button {
    all: unset;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 27px;

    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    height: 32px;

    background-color: var(--main-color);
    color: #ffffff;

    user-select: none;
    margin-top: 1rem;
}


.line {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;
    margin: 1.25rem 0;
}
</style>