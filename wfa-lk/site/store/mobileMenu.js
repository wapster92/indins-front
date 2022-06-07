export const state = () => ({
  open: false,
});

export const mutations = {
  toggle(state, payload) {
    state.open = payload;
  },
  close(state) {
    state.open = false;
  },
};

export const actions = {
  toogle({ getters, commit }) {
    const open = !getters.getMenuStatus;
    commit('toggle', open);
  },
  close({ commit }) {
    commit('close');
  },
};

export const getters = {
  getMenuStatus(state) {
    return state.open;
  },
};
