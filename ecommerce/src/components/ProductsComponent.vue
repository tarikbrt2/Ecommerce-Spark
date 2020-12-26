<template>
    <div class="container">
        <div class="flex">
            <div v-for="(product, i) in getProducts" :key="i" class="product">
                <div class="card">
                    <img :src="product.img" />
                    <h1>{{ product.name }}</h1>
                    <div class="product-desc">
                        <p>${{ product.price }}</p>
                        <p>Quantity: {{ product.quantity }}</p>
                    </div>
                    <div class="product-btns">
                        <a @click.prevent="submit(product)" class="btn">BUY</a>
                        <router-link
                            class="btn"
                            :to="{ path: '/product/' + product._id }"
                            >INFO</router-link
                        >
                        <a
                            v-if="getAdmin"
                            @click.prevent="submitDelete(product)"
                            class="btn"
                            >DELETE</a
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
        this.isAdmin();
    },
    methods: {
        ...mapActions(['fetchProducts', 'addToCart', 'isAdmin', 'deleteProduct']),
        submit(data) {
            this.addToCart(data);
            this.$toasted.show('You have sucessfully added this item to your cart.', {
                duration: 3000,
                icon: 'check-circle',
            });
        },
        submitDelete(product) {
            this.deleteProduct(product).then(() => {
                this.$store.commit('deleteProduct', product._id);
                this.$toasted.show('You have sucessfully deleted this product.', {
                duration: 3000,
                icon: 'check-circle',
            });
            })
            .catch((err) => {
                console.log(err);
            });
        },
    },
    computed: {
        ...mapGetters(['getProducts', 'getAdmin']),
    },
};
</script>

<style>
</style>
