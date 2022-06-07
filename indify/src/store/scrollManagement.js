export const state = () => ({
  registeredScrolls: {},
  currentScroll: null,
});

export const getters = {
  scrollIsRegistered: state => name => state.registeredScrolls[name],
  scrollIsActive: state => name => state.currentScroll === name,
  canBeActivated: state => !state.currentScroll,
};
export const mutations = {
  setScroll(state, { name, value }) {
    state.registeredScrolls[name] = value;
  },
  setCurrentScroll(state, name) {
    if (!name) {
      state.currentScroll = null;
      return;
    }
    state.currentScroll = name;
  },
};

export const actions = {
  registerScroll({ commit }, name) {
    commit('setScroll', { name, value: true });
  },
  unregisterScroll({ commit }, name) {
    commit('setScroll', { name, value: false });
  },
  activateScroll({ commit }, name) {
    commit('setCurrentScroll', name);
  },
  deactivateScroll({ commit }) {
    commit('setCurrentScroll', null);
  },
};
