<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
import { components, paths } from "store.oas";

const { data: products } = await useFetch<components["schemas"]["StoreProductsListRes"]>(config.public.medusaUrl + "/store/products", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
});
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    <p>Medusa URL: {{ config.public.medusaUrl }}</p>
    <h2>Medusa Products</h2>
    <ul>
      <li v-for="product in products!.products" :key="product.id">
        <p>{{ product.thumbnail || "FUUUUUUUUUUU" }}</p>
        <img :src="product.thumbnail" v-if="product.thumbnail" alt="product image" />
        {{ product.title }}
        <p>
          {{ product.description }}
        </p>
        <p>
          {{ ((product.variants?.[0]?.prices?.[0]?.amount || 0) / 10).toFixed(2) }} €
        </p>
      </li>
    </ul>
  </div>
</template>
