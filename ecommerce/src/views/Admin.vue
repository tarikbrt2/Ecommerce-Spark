<template>
  <AdminComponent/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AdminComponent from '../components/AdminComponent.vue';

export default {
    name: 'Admin',
    components: {
        AdminComponent,
    },
    computed: {
      ...mapGetters(['getAdmin']),
    },
    methods: {
      ...mapActions(['isAdmin']),
    },
    created() {
      this.isAdmin().then(() => {
        if (!this.getAdmin) {
          this.$router.push('/');
        }
      });
    },
};
</script>

<style>

</style>
