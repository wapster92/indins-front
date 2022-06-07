/*eslint-disable*/
export const state = () => ({
  show: false,
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
};

export const getters = {
  show: state => state.show,
};
