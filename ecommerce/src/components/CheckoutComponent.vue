<template>
    <div v-if="getCart[0]" class="checkout">
        <div class="flex">
            <div class="grid">
                <div class="card">
                    <form>
                        <div class="form-control">
                            <input
                                v-model="name"
                                type="text"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div class="form-control">
                            <input
                                v-model="address"
                                type="text"
                                placeholder="Enter your address"
                            />
                        </div>
                        <div class="form-control">
                            <input
                                @click.prevent="submit()"
                                class="btn"
                                type="submit"
                                value="CHECKOUT"
                            />
                        </div>
                    </form>
                </div>
                <div class="card">
                    <h3 id="items">Items</h3>
                    <p v-for="(item, index) in getCart" :key="index">
                        {{ item.name }} | Quantity: {{ item.quantity }} | Price:
                        ${{ item.total }}
                    </p>
                    <h3 id="total">Total: ${{ sum(getCart, 'total') }}</h3>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        {{ $router.push('/') }}
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Checkout',
    data() {
        return {
            name: '',
            address: '',
        };
    },
    methods: {
        ...mapActions(['checkout']),
        sum(items, key) {
            return items.reduce((a, b) => a + b[key], 0);
        },
        submit() {
            if (!this.name || !this.address) {
                this.$toasted.show('Please fill all the fields.', {
                    duration: 3000,
                    icon: 'exclamation-circle',
                });
            } else {
                const fullAddress = `${this.name}, ${this.address}`;
                const payload = {
                    deliveryAddress: fullAddress,
                    cost: this.sum(this.getCart, 'total'),
                };
                this.checkout(payload)
                .then(() => {
                    this.$toasted.show('You have successfully ordered items from your cart.', {
                        duration: 3000,
                        icon: 'check-circle',
                    });
                    this.$router.push('/');
                    this.$store.commit('removeCart');
                })
                .catch((err) => {
                    this.$toasted.show(err, {
                        duration: 3000,
                        icon: 'exclamation-circle',
                    });
                });
            }
        },
    },
    computed: {
        ...mapGetters(['getCart']),
    },
};
</script>

<style>
</style>
