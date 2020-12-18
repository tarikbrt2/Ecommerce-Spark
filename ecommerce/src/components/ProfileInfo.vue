<template>
    <div class="profile-info">
        <div class="profile-info-header">
            <h1>PROFILE</h1>
            <button @click.prevent="logOut()" class="btn">LOGOUT</button>
        </div>
        <div class="profile-main">
            <div class="personal-details">
                <h1>PERSONAL DETAILS</h1>
                <img
                    src="https://www.buzzsneakers.com/files/thumbs/files/images/product/brand/adidas/thumbs_600/FW3639_600_600px.jpg"
                />
                <div class="flex">
                    <h1>NAME: Tarik</h1>
                    <h1>EMAIL: tarik@gmail.com</h1>
                    <h1>BIRTHDAY: 24/09/2001</h1>
                    <h1>PHONE: 123123123</h1>
                </div>
            </div>
            <div class="profile-about">
                <div class="about-header">
                    <h1>ABOUT ME</h1>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Odit autem cupiditate accusamus dolores inventore neque in?
                    Eligendi dolorem provident ipsa voluptate dolor vero
                    explicabo sunt officiis consequatur. Molestiae, architecto
                    nulla!
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'ProfileInfo',
    methods: {
        ...mapActions(['logOut']),
    },
};
</script>

<style>
</style>
