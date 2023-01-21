import { defineStore, storeToRefs } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: {},
  }),
  actions: {
    addProduct(product) {
      if (this.products[product.id]) {
        this.products[product.id].quantity += 1
      } else {
        this.products[product.id] = {
          ...product,
          quantity: 1,
        }
      }
    },
    //remove 1 or delete product
    removeProduct(productID) {
      if (this.products[productID].quantity > 1) {
        this.products[productID].quantity -= 1
      } else {
        delete this.products[productID]
      }
    },
    clearCart() {
      this.products = {}
    },
  },
  persist: true,
})
