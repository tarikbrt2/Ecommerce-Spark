import axios from 'axios';
import jwtDecode from 'jwt-decode';

const state = {
    loggedIn: false,
    token: localStorage.getItem('token'),
    profileInfo: '',
};

const getters = {
    getLoggedIn: (state) => state.loggedIn,
    getToken: (state) => state.token,
    getProfileData: (state) => state.profileInfo,
};

const actions = {
    loginUser({ commit }, data) {
        axios.post('/api/customers/login', data)
            .then((response) => {
                commit('setToken', response.data.token);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    checkLogged({ commit }) {
        commit('isLogged');
    },
    logOut({ commit }) {
        commit('logOut');
    },
    register({ commit }, data) {
        axios.post('/api/customers', data)
            .then((response) => {
                commit('register', response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getProfileInfo({ commit }, token) {
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
    },
};

const mutations = {
    setToken(state, token) {
        state.loggedIn = true;
        state.token = token;
        localStorage.setItem('token', token);
    },
    isLogged(state) {
        if (state.token) {
            const token = state.token.split(' ');
            if (token) {
                try {
                    const payload = jwtDecode(token[1]);
                    if (payload.id) {
                        state.loggedIn = true;
                    }
                } catch (err) {
                    state.loggedIn = false;
                    state.token = '';
                    localStorage.setItem('token', state.token);
                    console.log(err);
                }
            } else {
                state.loggedIn = false;
                state.token = '';
                localStorage.setItem('token', state.token);
            }
        } else {
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
