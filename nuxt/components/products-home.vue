<!-- <script setup lang="ts"> -->
<script setup>
import { useRoute } from 'vue-router'
//get the value in the url for filter, sort and search
const { query } = useRoute()
console.log(query)
const config = useRuntimeConfig()
const products = ref([])
const pending = ref(true)

fetch(`${config.API_URL}/product/all?${Object.keys(query).map(key => `${key}=${query[key]}`).join('&')}`)
    .then(res => res.json())
    .then(data => {
        products.value = data
        pending.value = false
    })
    .catch(err => {
        console.log(err)
        pending.value = false
    })
</script>

<template>
    <div v-if="pending"> Loading ... </div>
    <div v-else class="flow">

        <Product v-for="product in products" :key="product.id" v-bind=product />

    </div>
</template>

<style scoped>
.flow {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
    margin-top: 64px;
    margin-bottom: 128px;
}
</style>