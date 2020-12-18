<template>
  <ProfileInfo v-if="getLoggedIn"/>
  <LoginComponent v-else/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ProfileInfo from '../components/ProfileInfo.vue';
import LoginComponent from '../components/LoginComponent.vue';

export default {
    name: 'Profile',
    components: {
        ProfileInfo,
        LoginComponent,
    },
    created() {
      this.checkLogged();
    },
    methods: {
      ...mapActions(['checkLogged']),
    },
    computed: {
      ...mapGetters(['getLoggedIn']),
    },
};
</script>

<style>

</style>
