<template>
    <div class="login">
        <div class="container">
            <div class="card">
                <form @submit.prevent="">
                    <h1>Login</h1>
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
                            v-model="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div class="grid">
                        <div class="form-control">
                            <input
                                @click.prevent="submit({ email, password })"
                                class="btn"
                                type="submit"
                                value="LOGIN"
                                required
                            />
                        </div>
                        <div class="form-control">
                            <input
                                @click.prevent="$router.push('/register')"
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
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        ...mapActions(['loginUser']),
        submit(data) {
            this.loginUser(data)
                .then((response) => {
                    // Getting response from backend and commiting changes to Vuex state
                    this.$store.commit('setToken', response.data.token);
                    // Showing notification as user sucessfully logged in
                    this.$toasted.show('Successfully logged in.', {
                        duration: 3000,
                        icon: 'check-circle',
                    });
                })
                .catch((err) => {
                    // Getting error from backend
                    // If fields are empty,
                    // notifying user that he/she should fullfill all the fields
                    if (!this.email || !this.password) {
                        this.$toasted.show('Please fill all the fields.', {
                            duration: 3000,
                            icon: 'exclamation-circle',
                        });
                    } else {
                        // Otherwise displaying error to user
                        const message = err.response.data.message;
                        this.$toasted.show(message, {
                            duration: 3000,
                            icon: 'exclamation-circle',
                        });
                    }
                });
        },
    },
};
</script>

<style>
</style>
