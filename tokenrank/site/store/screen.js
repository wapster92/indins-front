export const state = () => ({
  windowWidth: 0,
});

export const mutations = {
  changeWidth(state, payload) {
    state.windowWidth = payload;
  },
};
