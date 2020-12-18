<template>
    <div class="card-container">
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
