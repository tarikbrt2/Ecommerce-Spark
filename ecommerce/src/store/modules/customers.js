import axios from 'axios';
import jwtDecode from 'jwt-decode';

const state = {
    loggedIn: false,
    token: localStorage.getItem('token'),
    profileInfo: '',
    admin: false,
};

const getters = {
    getLoggedIn: (state) => state.loggedIn,
    getToken: (state) => state.token,
    getProfileData: (state) => state.profileInfo,
    getAdmin: (state) => state.admin,
};

const actions = {
    loginUser(_, data) {
        return axios.post('/api/customers/login', data);
    },
    checkLogged({ commit }) {
        commit('isLogged');
    },
    logOut({ commit }) {
        commit('logOut');
    },
    register(_, data) {
        return axios.post('/api/customers', data);
    },
    getProfileInfo({ state, commit }, token) {
        try {
            jwtDecode(token.split(' ')[1]);
            axios.get('/api/customers/profile', {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                commit('setProfileInfo', response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (err) {
            state.admin = false;
            state.token = '';
            localStorage.setItem('token', state.token);
            state.loggedIn = false;
        }
    },
    isAdmin({ commit }) {
        commit('checkAdmin');
    },
};

const mutations = {
    checkAdmin(state) {
        const token = state.token.split(' ');
        try {
            const payload = jwtDecode(token[1]);
            if (payload.role > 0) {
                state.admin = true;
            }
        } catch (err) {
            state.admin = false;
        }
    },
    setToken(state, token) {
        state.loggedIn = true;
        state.token = token;
        localStorage.setItem('token', token);
    },
    isLogged(state) {
        const token = state.token.split(' ');
        try {
            const payload = jwtDecode(token[1]);
            if (payload.id) {
                state.loggedIn = true;
            }
        } catch (err) {
            state.loggedIn = false;
            state.token = '';
            localStorage.setItem('token', state.token);
        }
    },
    logOut(state) {
        state.token = '';
        state.loggedIn = false;
        localStorage.setItem('token', state.token);
    },
    setProfileInfo(state, data) {
        state.profileInfo = data;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
