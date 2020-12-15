<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<style>
@import url('./style/style.css');
@import url('./style/utilities.css');

</style>

<script>
import Header from './views/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>
