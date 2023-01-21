<script setup>
//import cart store
import { useCartStore } from '@/stores/cart'

const CartStore = useCartStore()
console.log(CartStore.products)
const cartTotalTTC = computed(() => {
    let total = 0
    for (const [id, product] of Object.entries(CartStore.products)) {
        // console.log(id, product)
        total += Math.ceil(product.priceHT * (1 + product.TVAPercent / 100) * product.quantity)
    }
    return total
})
const cartTotalHT = computed(() => {
    let total = 0
    for (const [id, product] of Object.entries(CartStore.products)) {
        // console.log(id, product)
        total += Math.ceil(product.priceHT * product.quantity)
    }
    return total
})
</script>

<template>
    <div class="greed">
        <div class="summary">
            <h1>Panier</h1>
            <div class="color"></div>
            <p>Sous-total ht : {{ cartTotalHT / 100 }} €</p>
            <p>Sous-total ttc : {{ cartTotalTTC / 100}} €</p>
            <NuxtLink to="/cart/addresse" class="button checkout">Commander</NuxtLink>
        </div>
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
            <p class="total">Sous-total ttc : {{ cartTotalTTC / 100 }} €</p>
            <NuxtLink to="/cart/addresse" class="button checkout">Commander</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.greed {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: '. cart summary';

    gap: 1rem;
    margin-top: 42px;
}

.summary {
    display: flex;
    height: fit-content;
    flex-direction: column;
    align-items: flex-end;
    justify-content: start;
    /* gap: 0.25rem; */
    margin-right: auto;
    margin-top: 42px;
    grid-area: summary;

    width: 200px;
}

.summary h1 {
    height: auto;
    width: auto;
    text-align: right;
    margin-right: 12px;
    margin-bottom: 2px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 22px;
}

.summary .color {
    width: 100%;
    height: 1px;
    background-color: var(--main-color);
}

.summary p {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;

    margin: 7px 0;
    margin-right: 12px;
}

.summary .checkout {
    margin-top: 11px;
    width: 100%;
}

/** */
.cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 42px;
    grid-area: cart;
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

.total {
    width: min(calc(100vw - 6%), 384px);


    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    text-align: right;
}

.checkout {
    width: min(calc(100vw - 2%), 400px);

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}

@media screen and (max-width: 768px) {
    .greed {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-template-areas: 'summary' 'cart';
    }

    .summary {
        width: min(calc(100vw - 6%), 384px);
        margin: auto;
    }
}
</style>