import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  isAuth: false,
  authToken: "",
};
const getters = {
  isAuth: (state) => {
    return state.isAuth;
  },
};
const mutations = {
  updateAuthState(state, payload) {
    state.isAuth = payload;
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [createPersistedState()],
});
