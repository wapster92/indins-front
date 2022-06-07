import { getType } from '../helpers';
export const state = () => ({
  shown: false,
  options: {
    fullscreen: false,
    image: null,
  }
});

export const mutations = {
  setShown(state, value) {
    state.shown = value;
  },
  setOptions(state, value) {
    state.options = value;
  }
};

export const actions = {
  show({ commit }, payload) {
    if(!process.client) return;

    if (getType(payload) === 'Object') commit('setOptions', { ...payload });

    commit('setShown', true);
  },
  hide({ commit }) {
    if(!process.client) return;

    commit('setShown', false);
    commit('setOptions', {
      fullscreen: false,
      image: null,
    });
  }
}

export const getters = {
  show: (state) => state.shown,
  preloadOptions: (state) => state.options
}
