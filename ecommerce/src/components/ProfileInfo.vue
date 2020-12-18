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
                    <h1>NAME: {{ getProfileData.name }}</h1>
                    <h1>EMAIL: {{ getProfileData.email }}</h1>
                    <h1>BIRTHDAY: {{ getProfileData.birthDay }}</h1>
                    <h1>PHONE: {{ getProfileData.phone }}</h1>
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
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ProfileInfo',
    created() {
        this.getProfileInfo(this.getToken);
    },
    methods: {
        ...mapActions(['logOut', 'getProfileInfo']),
    },
    computed: {
        ...mapGetters(['getToken', 'getProfileData']),
    },
};
</script>

<style>
</style>
