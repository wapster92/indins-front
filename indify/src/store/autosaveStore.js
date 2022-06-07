import Vue from 'vue';

export default {
  state: () => ({
    isVisible: false,
    isFixed: false,
    confirmHandler: null,
    rejectHandler: null,
  }),
  getters: {},
  mutations: {
    changeAutosave(state, { isVisible, isFixed, confirmHandler, rejectHandler }) {
      state.isVisible = isVisible === undefined
        ? !state.isVisible
        : isVisible || false;
      state.isFixed = isFixed || false;
      state.confirmHandler = confirmHandler || null;
      state.rejectHandler = rejectHandler || null;
    },
  },
  actions: {
    toggle({ commit }, info) {
      commit('changeAutosave', info);
    },
    hide({ commit }) {
      commit('changeAutosave', {
        isVisible: false,
        isFixed: false,
        confirmHandler: null,
        rejectHandler: null,
      });
    },
  },
}
