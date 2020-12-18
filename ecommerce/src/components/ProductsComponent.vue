<template>
    <div class="container">
        <div class="flex">
            <div v-for="(product, i) in getProducts" :key="i" class="product">
                <div class="card">
                    <img :src="product.img" />
                    <h1>{{ product.name }}</h1>
                    <div class="flex">
                        <p>${{ product.price }}</p>
                        <p>Quantity: {{ product.quantity }}</p>
                    </div>
                    <div class="flex">
                        <a @click.prevent="addToCart(product)" class="btn">BUY</a>
                        <router-link class="btn" :to="{ path: '/product/' + product._id }"
                            >INFO</router-link
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Products',
    created() {
        this.fetchProducts();
    },
    methods: {
        ...mapActions(['fetchProducts', 'addToCart']),
    },
    computed: {
        ...mapGetters(['getProducts']),
    },
};
</script>

<style>
</style>
