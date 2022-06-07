let snackTimeout;
export const state = () => ({
  shown: false,
  options: {
    text: null,
    color: null,
    timeout: null,
    buttonText: null,
    buttonHandler: null,
  }
});
export const mutations = {
  setShown(state, value) {
    state.shown = value;
  },
  setOptions(state, value) {
    state.options = value;
  },
};
export const actions = {
  show({commit, state}, data) {
    if (!process.client) {
      return;
    }
    clearTimeout(snackTimeout);
    if (!data.text) {
      commit('setShown', false);
      return;
    }
    commit('setOptions', {
      color: 'accent',
      timeout: 5 * 1000,
      buttonText: null,
      buttonHandler: null,
      ...data,
    });
    commit('setShown', true);
    snackTimeout = setTimeout(() => commit('setShown', false), state.options.timeout);
  },
  error({dispatch}, text) {
    dispatch('show', {
      color: 'error',
      text
    })
  },
  notify({dispatch}, text) {
    dispatch('show', {
      text
    })
  },
  info({dispatch}, text) {
    dispatch('show', {
      color: 'placeholder-color',
      text
    })
  }
};
