<script setup lang="ts">
const route = useRoute()
const client = useMedusaClient();
  const { products } = await client.products.list();
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    <h2>Medusa Products</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
    
  </div>
</template>
