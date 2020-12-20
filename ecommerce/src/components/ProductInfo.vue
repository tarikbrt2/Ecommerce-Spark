<template>
    <div class="product-info">
        <div class="container flex">
            <div class="product-img">
                <img :src="getProduct.img" />
                <button @click.prevent="submit(getProduct)" class="btn">
                    ADD TO CART
                </button>
            </div>
            <div class="flex">
                <div class="product-title">
                    <h1>{{ getProduct.name }}</h1>
                </div>
                <div class="product-description">
                    <p>
                        {{ getProduct.description }}
                    </p>
                </div>
                <p>
                    Price: ${{ getProduct.price }} |
                    <span>Quantity: {{ getProduct.quantity }} </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ProductInfo',
    created() {
        this.getProductInfo(this.$route.params.id);
    },
    methods: {
        ...mapActions(['getProductInfo', 'addToCart']),
        submit(data) {
            this.addToCart(data).then(() => {
                this.$toasted.show('You have sucessfully added this item to your cart.', {
                    duration: 3000,
                    icon: 'check-circle',
                });
            });
        },
    },
    computed: {
        ...mapGetters(['getProduct']),
    },
};
</script>

<style>
</style>
