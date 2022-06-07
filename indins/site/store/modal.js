/*eslint-disable*/
export const state = () => ({
  show: false,
  options: null,
});

export const mutations = {
  show(state) {
    state.show = true;
  },
  hide(state) {
    state.show = false;
  },
  switch(state) {
    state.show = !state.show;
  },
  setOptions(state, payload) {
    state.options = { ...payload };
  },
  clearOptions(state) {
    state.options = null;
  },
};

export const getters = {
  show: state => state.show,
  options: state => state.options,
};
