<script setup>
import { useCartStore } from '@/stores/cart'

const CartStore = useCartStore()
const props = defineProps({
    id: Number,
    title: String,
    text: Number,
    stock: Number,
    priceHT: Number,
    TVAPercent: Number,
    ProductIllustration: [],
    averageRate: Number,
})

// empty star"&#xe838;" semi-filled star"&#xe83a;" filled star"&#xe83c;"
//calc start rating with averageRate
const startRating = computed(() => {
    const rating = props.averageRate
    const fullStars = Math.floor(rating)
    const halfStars = Math.round(rating - fullStars)
    const emptyStars = 5 - fullStars - halfStars
    return {
        fullStars,
        halfStars,
        emptyStars
    }
})
const priceTTC = computed(() => Math.ceil(props.priceHT * (1 + props.TVAPercent / 100)))

function addToCart(e) {
    CartStore.addProduct(props)
}
</script>

<template>
    <NuxtLink :to="'/product/' + props.id">
        <article>
            <img :src="props.ProductIllustration[0] || 'https://img.freepik.com/vecteurs-libre/oops-erreur-404-illustration-concept-robot-casse_114360-5529.jpg'"
                alt="">
            <h1 class="primary">{{ title }}</h1>
            <div class="line">
                <span class="price">{{ priceTTC/ 100 }} €</span>
                <span class="note">
                    <span>{{ props.averageRate || "" }}</span>
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
        </article>
    </NuxtLink>
</template>

<style scoped>
.primary {
    color: var(--main-color);
}

.primary-reverse {
    background-color: var(--main-color);
    color: #ffffff;
}

article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 230px;
    max-height: 300px;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
    border: 1px solid #BABABA;
    border-radius: 3px;

    /* overflow: hidden */
}

img {
    width: 230px;
    min-width: 230px;
    min-height: 160px;
    height: 160px;
    object-fit: cover;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

}

h1 {
    margin: 0;
    padding: 4px 4px 2px;
    height: 81px;
    width: 100%;
    box-sizing: border-box;
    text-align: start;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    overflow: hidden;
    text-overflow: ellipsis;
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
    align-items: center;
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

/* .addCart:active {} */
</style>