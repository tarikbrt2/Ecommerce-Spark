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
                                @click.prevent="loginUser({ email, password })"
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
    },
};
</script>

<style>
</style>
