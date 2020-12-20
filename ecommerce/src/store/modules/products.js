import axios from 'axios';
import router from '../../router/index';

const state = {
    product: '',
    products: [],
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
};

const getters = {
    getProduct: (state) => state.product,
    getProducts: (state) => state.products,
    getCart: (state) => state.cart,
};

const actions = {
    checkout(_, data) {
        return axios.post('/api/orders', data);
    },
    getProductInfo({ commit }, id) {
        axios.get(`/api/products/${id}`)
            .then((response) => {
                commit('setProductInfo', response.data);
            })
            .catch((error) => {
                if (process.env.NODE_ENV === 'production') {
                    console.log(error);
                }
                router.push('/');
            });
    },
    fetchProducts({ commit }) {
        axios.get('/api/products')
            .then((response) => {
                const { error } = response;
                if (error) {
                    if (process.env.NODE_ENV === 'production') {
                        console.log(error);
                    }
                } else {
                    commit('setProducts', response.data);
                }
            })
            .catch((error) => {
                if (process.env.NODE_ENV === 'production') {
                    console.log(error);
                }
            });
    },
    addToCart({ commit }, product) {
        const item = {
            _id: product._id,
            name: product.name,
            quantity: 1,
            total: product.price,
            price: product.price,
            img: product.img,
        };
        commit('setCart', item);
        return new Promise((resolve) => {
            resolve({ msg: 'You have successfully added item to your cart.' });
        });
    },
    addQuantity({ commit }, data) {
        commit('setQuantity', data);
    },
    addItem(_, data) {
        return axios.post('/api/products', data);
    },
    uploadImage(_, data) {
        return axios.post('/api/uploads/', data);
    },
};

const mutations = {
    setProductInfo: (state, data) => {
        state.product = data;
    },
    setProducts: (state, data) => {
        state.products = data;
    },
    setCart: (state, item) => {
        const index = state.cart.findIndex((prod) => prod._id === item._id);
        if (index !== -1) {
            state.cart[index].quantity += 1;
            state.cart[index].total += item.price;
        } else {
            state.cart.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setQuantity: (state, data) => {
        const index = state.cart.findIndex((prod) => prod._id === data.item._id);
        if (index !== -1) {
            state.cart[index].quantity += data.number;
            state.cart[index].total += data.item.price * data.number;
            if (state.cart[index].quantity <= 0) {
                state.cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    },
    removeCart: (state) => {
        state.cart = [];
        localStorage.removeItem('cart');
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
