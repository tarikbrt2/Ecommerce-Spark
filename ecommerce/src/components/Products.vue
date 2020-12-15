<template>
    <div class="container">
        <div class="flex">
            <div v-for="(product, i) in products" :key="i" class="product">
                <div class="card">
                    <img :src="products[i].img" />
                    <h1>{{ products[i].name }}</h1>
                    <div class="flex">
                        <p>${{ products[i].price }}</p>
                        <p>Quantity: {{ products[i].quantity }}</p>
                    </div>
                    <div class="flex">
                        <router-link to="/product/id">BUY</router-link>
                        <router-link to="/product/id">INFO</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Products',
    beforeCreate() {
        axios
            .get('/api/products')
            .then((response) => {
                const { error } = response;
                if (error) {
                    if (process.env.NODE_ENV === 'production') {
                        console.log(error);
                    }
                } else {
                    this.products = response.data;
                    console.log(this.products);
                }
            })
            .catch((error) => {
                if (process.env.NODE_ENV === 'production') {
                    console.log(error);
                }
            });
    },
    data() {
        return {
            products: [],
        };
    },
};
</script>

<style>
</style>
