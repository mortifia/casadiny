<script setup lang="ts">
const config = useRuntimeConfig()

const email = ref()
const password = ref()

const success = ref(false)
const error = ref(false)
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
    console.log("fuuuuu")
    console.log(res)
    console.log("fiiiii")
    if (res.res.status !== 200) {
        console.log(res.body)
        error.value = res.body.message
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
        <h1>sign-up</h1>

        <form method="post" @submit.prevent="submit" v-if="success == false">
            <input type="text" name="email" v-model="email" placeholder="email" />
            <input type="password" name="password" v-model="password" placeholder="password" />
            <p v-if="error !== false" style="color: red;">{{ error }}</p>
            <input type="submit" value="submit" />
        </form>
        <div v-else>
            <h1>Success</h1>
            <p>Redirecting to login page in {{ timeRedirect }}s...</p>
            <NuxtLink to="/auth/sign-in">Login</NuxtLink>
        </div>
    </div>
</template>