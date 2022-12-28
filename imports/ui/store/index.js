import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  isAuth: false,
  authToken: "",
  user: null,
};
const getters = {
  isAuth: (state) => {
    return state.isAuth;
  },
  userGetter: (state) => {
    return state.user;
  },
};
const mutations = {
  updateAuthState(state, payload) {
    state.isAuth = payload;
  },
  updateUserState(state, payload) {
    state.user = payload;
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [createPersistedState()],
});
