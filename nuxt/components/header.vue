<script setup lang="ts">
import { Ref } from 'vue';
import { useJwtStore } from '@/stores/jwt'

const config = useRuntimeConfig()
const jwtStore = useJwtStore()

const admin: Ref<null | Boolean> = ref(null)
//check if admin
if (jwtStore.jwt !== null) {
    fetch(`${config.API_URL}/auth/admin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${jwtStore.jwt}`
        }
    }).then(async (res) => {
        if (res.status === 200) {
            admin.value = true
        }
        else {
            admin.value = false
        }
    })
}

</script>
<template>
    <div id="header">
        <nav id="navmenu">
            <input type="checkbox" id="nav-trigger" class="nav-trigger" />
            <label for="nav-trigger" id="shadow">
            </label>
            <ul id="menu">
                <NuxtLink to="/">Accueil</NuxtLink>
                <!-- <NuxtLink to="/about">A propos</NuxtLink> -->
                <br>
                <NuxtLink v-if="jwtStore.jwt === null" to="/auth/sign-in">Connexion</NuxtLink>
                <NuxtLink v-if="jwtStore.jwt === null" to="/auth/sign-up">Inscription</NuxtLink>

                <NuxtLink v-if="jwtStore.jwt !== null && admin === true" to="/admin">admin</NuxtLink>
                <NuxtLink v-if="jwtStore.jwt !== null" to="/auth/sign-out">Déconnexion</NuxtLink>

            </ul>
            <NuxtLink to="/">
                <h1 class="title">Casadiny</h1>
            </NuxtLink>
            <label for="nav-trigger" id="nav-trigger-label">
                <div id="nav-icon2" for="nav-trigger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </label>
        </nav>
        <div id="auth">
            <NuxtLink v-if="jwtStore.jwt === null" to="/auth/sign-in">Connexion</NuxtLink>
            <NuxtLink v-if="jwtStore.jwt === null" to="/auth/sign-up">Inscription</NuxtLink>

            <NuxtLink v-if="jwtStore.jwt !== null && admin === true" to="/admin">admin</NuxtLink>
            <NuxtLink v-if="jwtStore.jwt !== null" to="/auth/sign-out">Déconnexion</NuxtLink>

        </div>
        <NuxtLink id="cart" to="/cart" class="material-symbols-outlined">&#xe8cc;</NuxtLink>
    </div>
</template>


<style scoped>
#header {
    position: sticky;
    width: 100%;
    height: 64px;
    top: 0;
    z-index: 100;

    display: grid;
    grid-template-columns: auto auto 1fr auto auto;
    grid-template-rows: 1fr;
    grid-template-areas: 'title menu . login cart';
    /* gap: 0 4.5rem; */

    justify-content: space-between;
    align-items: center;

    background-color: var(--main-color);
    box-sizing: border-box;
    /* padding: 0 1.5rem; */
    /* test */
    overflow-x: visible;
    overflow-y: visible;
}

#header #auth {
    grid-area: login;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr;
    grid-template-areas: 'login register';
    gap: 0 1.5rem;
    justify-content: end;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1.5rem;
    transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    /* for the animation*/
    position: relative;
    right: 0;
    overflow: hidden;
}

#header #cart {
    grid-area: cart;
    display: inline;
    color: #ffffff;
    font-size: 36px;
    padding: 0 1rem 0 0.5rem;
    transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

#header #cart:hover {
    transform: scale(1.2);
}

@media screen and (max-width: 768px) {
    #header #auth {
        position: relative;
        right: -1000%;
    }
}

#header #auth a {
    display: block;

    text-decoration: none;
    color: #ffffff;
    font-size: 1.3rem;
    line-height: 2.25rem;
    transition: all 0.15s, color 0.1s;
    text-decoration-color: var(--main-color);
}

#header .title {
    grid-area: title;
    display: inline;
    color: #ffffff;
    z-index: 100;
    position: relative;
    transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    font-weight: 500;
}

#header #navmenu {
    /* grid-area: menu; */
    grid-area: menu;
    /* display: inline; */
}

/* ----------------------------------------------- */
#nav-trigger {
    display: none;
}

#nav-trigger-label {
    grid-area: menu;
    z-index: 1000;
    margin: 0;
    padding: 0;
}

#navmenu {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;
    grid-template-areas: 'menu . title';
    /* gap: 0 4.5rem; */
    /* width: 300px; */
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1.5rem;
    gap: 1.5rem;
    transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

#nav-icon2 {
    width: 32px;
    height: 29px;
    /* position: relative; */
    margin: 0;
    padding: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
}

#nav-icon2 span {
    display: block;
    position: absolute;
    height: 5px;
    width: 50%;
    background: #ffffff;
    opacity: 1;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
}

#nav-trigger:checked~#nav-trigger-label span {
    background: #000000;
}

#nav-trigger:checked~a h1 {
    color: #000000;
}

#nav-icon2 span:nth-child(even) {
    left: 50%;
    border-radius: 0 5px 5px 0;
}

#nav-icon2 span:nth-child(odd) {
    left: 0px;
    border-radius: 5px 0 0 5px;
}

#nav-icon2 span:nth-child(1),
#nav-icon2 span:nth-child(2) {
    top: 0px;
}

#nav-icon2 span:nth-child(3),
#nav-icon2 span:nth-child(4) {
    top: 12px;
}

#nav-icon2 span:nth-child(5),
#nav-icon2 span:nth-child(6) {
    top: 24px;
}

#nav-trigger:checked~#nav-trigger-label span:nth-child(1),
#nav-trigger:checked~#nav-trigger-label span:nth-child(6),
#nav-icon2.open span:nth-child(1),
#nav-icon2.open span:nth-child(6) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}

#nav-trigger:checked~#nav-trigger-label span:nth-child(2),
#nav-trigger:checked~#nav-trigger-label span:nth-child(5),
#nav-icon2.open span:nth-child(2),
#nav-icon2.open span:nth-child(5) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

#nav-trigger:checked~#nav-trigger-label span:nth-child(1),
#nav-icon2.open span:nth-child(1) {
    left: 3px;
    top: 6px;
}

#nav-trigger:checked~#nav-trigger-label span:nth-child(2),
#nav-icon2.open span:nth-child(2) {
    left: calc(50% - 3px);
    top: 6px;
}

#nav-trigger:checked~#nav-trigger-label span:nth-child(3),
#nav-icon2.open span:nth-child(3) {
    left: -50%;
    opacity: 0;
}

#nav-trigger:checked~#nav-trigger-label span:nth-child(4),
#nav-icon2.open span:nth-child(4) {
    left: 100%;
    opacity: 0;
}

#nav-trigger:checked~#nav-trigger-label span:nth-child(5),
#nav-icon2.open span:nth-child(5) {
    left: 3px;
    top: 17px;
}

#nav-trigger:checked~#nav-trigger-label span:nth-child(6),
#nav-icon2.open span:nth-child(6) {
    left: calc(50% - 3px);
    top: 17px;
}

/* TESSSSSSST PART 2 menu*/
#menu {
    position: absolute;
    width: 300px;
    height: 100vh;
    margin: 0;
    padding: 5rem;
    padding-top: 4rem;
    box-sizing: border-box;
    top: 0;
    left: 0;

    /* background: #ffffff; */
    background: #ffffff;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    /* to stop flickering of text in safari */

    transform-origin: top left;
    transform: translate(-100%, 0);

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

#navmenu #nav-trigger:checked~#menu {
    transform: none;
}

#menu a {
    display: block;

    text-decoration: none;
    color: #000000;
    font-size: 1.2rem;
    line-height: 2.25rem;
    transition: all 0.15s, color 0.1s;
    text-decoration-color: var(--main-color);
}

#menu a:hover {
    color: var(--main-color);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    top: -0.23rem;
    transform: translateY(-0.22rem);
}

/* part 3 backround shadow */

#shadow {
    display: block;
    visibility: hidden;
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    filter: opacity(0);
    transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

#nav-trigger:checked~#shadow {
    visibility: visible;
    filter: opacity(1);
}
</style>