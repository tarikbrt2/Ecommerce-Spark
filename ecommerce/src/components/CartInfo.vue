<template>
    <div v-if="getCart[0]" class="card-container">
        <div v-for="(item, index) in getCart" :key="index" class="cart">
            <div class="container flex">
                <div class="cart-img">
                    <img class="card" :src="item.img" />
                </div>
                <div class="cart-details">
                    <p>Quantity: {{ item.quantity }}</p>
                    <p>Price: ${{ item.total }}</p>
                    <div class="cart-buttons">
                        <button
                            @click.prevent="addQuantity({ item, number: 1 })"
                            class="btn"
                        >
                            +
                        </button>
                        <button
                            @click.prevent="addQuantity({ item, number: -1 })"
                            class="btn"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="checkout-button">
            <button @click.prevent="$router.push('/checkout')" class="btn">CHECKOUT</button>
        </div>
    </div>
    <div v-else class="container">
        <h1> There is no items in your cart </h1>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CartInfo',
    methods: {
        ...mapActions(['addQuantity']),
    },
    computed: {
        ...mapGetters(['getCart']),
    },
};
</script>

<style>
</style>
