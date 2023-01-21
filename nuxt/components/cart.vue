<script setup>
//import cart store
import { useCartStore } from '@/stores/cart'

const CartStore = useCartStore()
console.log(CartStore.products)
const cartTotalTTC = computed(() => {
    let total = 0
    for (const [id, product] of Object.entries(CartStore.products)) {
        console.log(id, product)
        total += Math.ceil(product.priceHT * (1 + product.TVAPercent / 100) * product.quantity)
    }
    return total
})
</script>

<template>
    <div class="cart">
        <article v-for="product in CartStore.products" :key="product.id" class="cartProduct">
            <img :src="product.ProductIllustration[0]" alt="">
            <div class="cartProductData">

                <h1>{{ product.title }}</h1>
                <div class="prixData">
                    <span class="prix">{{
                        Math.ceil(product.priceHT * (1 + product.TVAPercent / 100) * product.quantity)
                            / 100
                    }} €
                    </span>
                    <span class="ttc">(TTC)</span>
                </div>
                <div>
                    <span @click=CartStore.removeProduct(product.id) class="button">-</span>
                    <span class="quantities">{{ product.quantity }}</span>
                    <span @click=CartStore.addProduct(product) class="button">+</span>
                </div>
            </div>
        </article>
        <p>Total : {{ cartTotalTTC / 100 }} €</p>
        <NuxtLink to="/cart/addresse" class="button checkout">Commander</NuxtLink>
    </div>
</template>

<style scoped>
.cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 42px;
}

.cartProduct {
    display: flex;
    flex-direction: row;
    width: min(calc(100vw - 2%), 400px);
    gap: 32px;
}

img {
    width: 70px;
    height: 120px;
    object-fit: cover;
    /* object-position: 80% 0; */
}

.cartProductData {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0.5rem 0;
}

h1 {
    width: 100%;
    height: 100%;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: justify;

    flex-grow: 1;
    flex-shrink: 1;

    display: flex;
    margin: 0;
}

.prixData {
    margin-bottom: 0.5rem;
}

.prix {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
}

.ttc {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;

    color: #999999;
}

.button {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 27px;

    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: 26px;
    height: 32px;

    background-color: var(--main-color);
    color: #ffffff;

    user-select: none;
}

.quantities {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin: 0 0.65rem;

    user-select: none;
}

.checkout {
    width: min(calc(100vw - 2%), 400px);

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}
</style>