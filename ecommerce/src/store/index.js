import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import customers from './modules/customers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    customers,
  },
});
