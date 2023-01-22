<script setup>
//import cart store
import { useCartStore } from '@/stores/cart'
import { useJwtStore } from '@/stores/jwt'

const config = useRuntimeConfig()

const CartStore = useCartStore()
const JwtStore = useJwtStore()

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

const address = ref([])
const addressIdTempon = ref(CartStore.address?.id || null)
const addressBillIdTempon = ref(CartStore.addressBill?.id || null)

watch(addressIdTempon, async (newVal) => {
    if (newVal === null) {
        CartStore.address = {}
    } else {
        CartStore.address = address.value.find((address) => address.id === newVal)
    }
})

watch(addressBillIdTempon, async (newVal) => {
    if (newVal === null) {
        CartStore.addressBill = {}
    } else {
        CartStore.addressBill = address.value.find((address) => address.id === newVal)
    }
})

const allAddressChecked = computed(() => {
    return addressBillIdTempon.value !== null && addressIdTempon.value !== null
})

const firstName = ref('')
const lastName = ref('')
const addressLine1 = ref('')
const addressLine2 = ref('')
const city = ref('')
const zipCode = ref('')
const state = ref('')
const phone = ref('')

// to update address list
function updateAddress() {
    fetch(`${config.API_URL}/user/address`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JwtStore.jwt,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            address.value = data
        })
}

async function addAddress(e) {
    const res = await fetch(`${config.API_URL}/user/address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + JwtStore.jwt,
        },
        body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            addressLine1: addressLine1.value,
            addressLine2: addressLine2.value,
            city: city.value,
            zipCode: zipCode.value,
            state: state.value,
            phone: phone.value,
        }),
    }).then((res) => res.json())
    if (res.error) {
        alert(res.error)
    } else {
        updateAddress()
    }
}

async function deleteAddress(id) {
    const res = await fetch(`${config.API_URL}/user/address/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + JwtStore.jwt,
        },
    }).then((res) => res.json())
    if (res.error) {
        alert(res.error)
    } else {
        updateAddress()
    }
}

updateAddress()
</script>

<template>
    <div class="greed">
        <div class="summary">
            <h1>Panier</h1>
            <div class="color"></div>
            <p>Sous-total ht : {{ cartTotalHT / 100 }} €</p>
            <p>Sous-total ttc : {{ cartTotalTTC / 100}} €</p>
            <NuxtLink to="/cart/summary" class="button checkout" v-if="JwtStore.jwt !== null && allAddressChecked">
                Commander</NuxtLink>
            <span class="button checkout error" v-if="JwtStore.jwt !== null && !allAddressChecked">il manque une
                adresse</span>
            <NuxtLink to="/auth/sign-in" class="button checkout error" v-if="JwtStore.jwt === null">Veuiller vous
                connecter</NuxtLink>
        </div>
        <div class="address">
            <h1>Adresse de livraison</h1>
            <div v-for="address in address" :key="address.id" class="lineAddress">
                <input type="radio" :id=address.id :value=address.id v-model="addressIdTempon" />
                <label :for=address.id>
                    <p>{{ address.addressLine1 }}, {{ address.zipCode }} {{ address.city }} {{ address.state }}</p>
                    <p>{{ address.firstName }} {{ address.lastName }} {{ address.phone.replace(/(.{2})/g, "$1 ") }}</p>
                </label>
                <button @click="deleteAddress(address.id)"
                    class="buttonLight material-symbols-outlined">&#xe92b;</button>
            </div>
            <div v-if="address.length == 0">
                <p>Vous n'avez pas d'adresse</p>
            </div>
            <form @submit.prevent="addAddress">
                <h2>Nouvelle adresse</h2>
                <div class="formWrapInputs">
                    <span>
                        <label for="firstName">Prénom</label>
                        <input type="text" name="firstName" id="firstName" placeholder="prénom" v-model="firstName" />
                    </span>
                    <span>
                        <label for="lastName">Nom</label>
                        <input type="text" name="lastName" id="lastName" placeholder="nom" v-model="lastName" />
                    </span>
                    <span>
                        <label for="addressLine1">adresse ligne 1</label>
                        <input type="text" name="addressLine1" id="addressLine1" placeholder="adresse ligne 1"
                            v-model="addressLine1" />
                    </span>
                    <span>
                        <label for="addressLine2">adresse ligne 2</label>
                        <input type="text" name="addressLine2" id="addressLine2" placeholder="adresse ligne2"
                            v-model="addressLine2" />
                    </span>
                    <span>
                        <label for="zipCode">code postal</label>
                        <input type="text" name="zipCode" id="zipCode" placeholder="code postal" v-model="zipCode" />
                    </span>
                    <span>
                        <label for="city">ville</label>
                        <input type="text" name="city" id="city" placeholder="ville" v-model="city" />
                    </span>
                    <span>
                        <label for="state">pays</label>
                        <input type="text" name="state" id="state" placeholder="pays" v-model="state" />
                    </span>
                    <span>
                        <label for="phone">téléphone</label>
                        <input type="text" name="phone" id="phone" placeholder="téléphone" v-model="phone" />
                    </span>
                </div>
                <button type="submit" class="button checkout">Ajouter adresse</button>

            </form>
            <h1>Adresse de facturation</h1>
            <div v-for="address in address" :key="address.id" class="lineAddress">
                <input type="radio" :id=-address.id :value=address.id v-model="addressBillIdTempon" />
                <label :for=-address.id>
                    <p>{{ address.addressLine1 }}, {{ address.zipCode }} {{ address.city }} {{ address.state }}</p>
                    <p>{{ address.firstName }} {{ address.lastName }} {{ address.phone.replace(/(.{2})/g, "$1 ") }}</p>
                </label>
            </div>
            <NuxtLink to="/cart/summary" class="button checkout" v-if="JwtStore.jwt !== null && allAddressChecked">
                Commander</NuxtLink>
            <span class="button checkout error" v-if="JwtStore.jwt !== null && !allAddressChecked">il manque une
                adresse</span>
            <NuxtLink to="/auth/sign-in" class="button checkout error" v-if="JwtStore.jwt === null">Veuiller vous
                connecter</NuxtLink>
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
    margin-bottom: 64px;
}

.summary {
    display: flex;
    height: fit-content;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;

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

.address .checkout {
    width: min(calc(100vw - 6%), 384px);
}

/** */

.address {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 42px;
    grid-area: cart;
}

.lineAddress {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* align-self: center; */
    width: min(calc(100vw - 6%), 500px);
    margin-right: 100px;


    justify-content: flex-start;
    gap: 0.5rem;
}

.lineAddress label {
    width: 100%;
}

.address form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: min(calc(100vw - 2%), 800px);
}

h2,
h1 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 36px;

    margin: 0.5rem;
}

.formWrapInputs {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0 1.5rem;
    margin: 0.5rem 0;
}

.formWrapInputs label {
    display: inline-block;
    width: 128px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
}

/** */

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
    min-height: 32px;

    background-color: var(--main-color);
    color: #ffffff;

    user-select: none;
    border: none;
}

.buttonLight {
    background-color: var(--main-color);
    color: #ffffff;
    min-width: 38px;
    min-height: 52px;

    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    user-select: none;
    border: none;

    /* border-top-right-radius: 2px; */
    /* border-bottom-right-radius: 2px; */

    font-size: 28px;

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

    .lineAddress {
        width: min(calc(100vw - 6%), 384px);
        margin: auto;
    }
}
</style>