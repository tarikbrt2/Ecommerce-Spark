<template>
    <div class="register">
        <div class="container">
            <div class="card">
                <form @submit.prevent="">
                    <h1>Register</h1>
                    <div class="form-control">
                        <input
                            v-model="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div class="form-control">
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Enter your e-mail"
                            required
                        />
                    </div>
                    <div class="form-control">
                        <input
                            v-model="birthDay"
                            type="text"
                            placeholder="13/01/1999"
                            required
                        />
                    </div>
                    <div class="form-control">
                        <input
                            v-model="phone"
                            type="text"
                            placeholder="061234567"
                            required
                        />
                    </div>
                    <div class="form-control">
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div class="grid">
                        <div class="form-control">
                            <input
                                @click.prevent="
                                    submit({
                                        name,
                                        email,
                                        password,
                                        phone,
                                        birthDay,
                                    })
                                "
                                class="btn"
                                type="submit"
                                value="REGISTER"
                                required
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            phone: '',
            birthDay: '',
        };
    },
    methods: {
        ...mapActions(['register']),
        submit(data) {
            this.register(data)
                .then(() => {
                    this.$toasted.show('You have sucessfully registered your customer account.', {
                        duration: 3000,
                        icon: 'check-circle',
                    });
                    this.$router.push('/');
                })
                .catch((err) => {
                    const message = err.response.data.message;
                    this.$toasted.show(message, {
                        duration: 3000,
                        icon: 'exclamation-circle',
                    });
                });
        },
    },
};
</script>

<style>
</style>
