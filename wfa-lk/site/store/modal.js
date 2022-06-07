export const state = () => ({
  modals: [],
});

export const mutations = {
  open(state, payload) {
    const modalIndex = state.modals.findIndex(el => el.name === payload);
    if (modalIndex < 0) {
      state.modals.push({ name: payload, status: true });
    } else {
      state.modals[modalIndex].status = true;
    }
  },
  close(state) {
    state.modals.forEach(el => {
      el.status = false;
    });
  },
};

export const actions = {
  open({ commit }, payload) {
    commit('open', payload);
  },
  close({ commit }) {
    commit('close');
  },
};

export const getters = {
  getModalStatus: state => name => state.modals.find(modal => modal.name === name),
  overlayActive(state) {
    return state.modals.find(modal => modal.status === true);
  },
};
