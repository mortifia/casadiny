<script setup>
import { useCartStore } from '@/stores/cart'

const config = useRuntimeConfig()
const route = useRoute()
const CartStore = useCartStore()

console.log(route.params.id)
const product = ref(null)
const images = ref([])

const prixTTC = computed(() => {
    if (product.value === null) { return 0 }
    return Math.ceil(Number(product.value[0].priceHT) * (1 + Number(product.value[0].TVAPercent) / 100))
})

const startRating = computed(() => {
    const rating = product.value[0].averageRate
    const fullStars = Math.floor(rating)
    const halfStars = Math.round(rating - fullStars)
    const emptyStars = 5 - fullStars - halfStars
    return {
        fullStars,
        halfStars,
        emptyStars
    }
})

fetch(`${config.API_URL}/product/all?id=${route.params.id}`)
    .then(async res => await res.json())
    .then(async (json) => {
        product.value = json
        images.value = product.value[0].ProductIllustration
    })
    .catch(err => {
        console.log(err)
        pending.value = false
    })

function addToCart(e) {
    CartStore.addProduct(product.value[0])
}
</script>

<template>
    <div>
        <Header />
        <div v-if="product" class="productFull">
            <img :src="images[0] || 'https://img.freepik.com/vecteurs-libre/oops-erreur-404-illustration-concept-robot-casse_114360-5529.jpg'"
                alt="product image">
            <!-- <img :src="product" alt="product image"> -->
            <div class="summary">
                <h1 class="primary">{{ product[0].title }}</h1>
                <div class="line">
                    <span class="price">{{ prixTTC / 100}} €</span>
                    <span class="note">
                        <span>{{ product[0].averageRate || "" }}</span>
                        <span class="material-symbols-outlined fill primary">
                            {{ '&#xe838;'.repeat(startRating.fullStars) }}
                        </span>
                        <span class="material-symbols-outlined primary">
                            {{ '&#xe839;'.repeat(startRating.halfStars) + '&#xe838;'.repeat(startRating.emptyStars) }}
                        </span>
                    </span>
                </div>
                <div class="addCart primary-reverse" @click="addToCart">
                    <span class="material-symbols-outlined">
                        add_shopping_cart
                    </span>
                </div>
            </div>
            <div class="description">
                <p>
                    But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
                    born and I will give
                    you a complete account of the system, and expound the actual teachings of the great explorer of the
                    truth, the
                    master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it
                    is pleasure, but
                    because those who do not know how to pursue pleasure rationally encounter consequences that are
                    extremely painful. Nor
                    again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,
                    but because
                    occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take
                    a trivial example,
                    which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?
                    But who has any right
                    to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one
                    who avoids a pain
                    that produces no resultant pleasure?
                </p>
                <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
                    born and I will give
                    you a complete account of the system, and expound the actual teachings of the great explorer of the
                    truth, the
                    master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it
                    is pleasure, but
                    because those who do not know how to pursue pleasure rationally encounter consequences that are
                    extremely painful. Nor
                    again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,
                    but because
                    occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take
                    a trivial example,
                    which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?
                    But who has any right
                    to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one
                    who avoids a pain
                    that produces no resultant pleasure?</p>
            </div>
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<style scoped>
.primary {
    color: var(--main-color);
}

.productFull {
    display: grid;
    grid-template-areas:
        "image . summary"
        "description description description";
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    gap: auto;
    padding: 1rem;
    /* //all in center */
    justify-items: center;
    align-items: center;
    width: min(calc(100vw - 6%), 800px);
    margin: auto;
}

img {
    grid-area: image;
    height: 280px;
    width: 420px;
    object-fit: cover;
}

.summary {
    grid-area: summary;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    width: 256px;
    height: 100%;
    margin: 0;
    padding: 1rem 0 0 0;
    box-sizing: border-box;
}

h1 {
    margin: 0.5rem 0;
    font-size: 18px
}

.line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0 11px 6px;
    margin: 8px;
    box-sizing: border-box;
}

.price {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    text-align: right;
}

.note {
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.note span {
    font-size: 12px;
    margin-right: 3px;
}

.note .material-symbols-outlined {
    font-size: 16px;
    margin: 0;
}

.addCart {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    cursor: pointer;
    z-index: 2;
    user-select: none;

    background-color: var(--main-color);
    color: #ffffff;

    margin-top: auto;
}

.addCart .material-symbols-outlined {

    font-size: 28px;
    font-variation-settings: 'wght' 200;

}

/** animation on clic cart*/
@keyframes addCart {
    0% {

        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.2, 1.2);
    }

    100% {
        transform: scale(1, 1);
    }
}

.addCart:not(:active) {
    /* now keep red background for 1s */
    animation: addCart 0.5s;
    transition: all 1000ms step-end;
}

.description {
    grid-area: description;
    width: 100%;
    margin: 3rem 0;
    text-align: justify;
}

@media screen and (max-width: 768px) {

    .productFull {
        grid-template-areas:
            "summary"
            "image"
            "description";
        grid-template-columns: auto;
        grid-template-rows: auto;
        gap: 1rem;
        width: min(calc(100vw - 6%), 800px);
        margin: auto;
    }

    .summary {
        width: min(calc(100vw - 6%), 384px);
        margin: auto;
    }

    img {
        width: min(calc(100vw - 6%), 384px);
        height: auto;
    }

    .description {
        width: min(calc(100vw - 6%), 384px);
        margin: auto;
    }


    /* .summary {
        width: min(calc(100vw - 6%), 384px);
        margin: auto;
    }

    .lineAddress {
        width: min(calc(100vw - 6%), 384px);
        margin: auto;
    } */
}
</style>