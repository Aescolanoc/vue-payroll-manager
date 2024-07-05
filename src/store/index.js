import { createStore } from "vuex";

export default createStore({
  state: {},
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {},
  modules: {},
});
