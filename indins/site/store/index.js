/*eslint-disable*/
export const state = () => ({
  footerBack: false,
  menuBack: false,
});

export const mutations = {
  showMenuBack(state) {
    state.menuBack = true;
  },

  hideMenuBack(state) {
    state.menuBack = false;
  },

  showFooterBack(state) {
    state.footerBack = true;
  },

  hideFooterBack(state) {
    state.footerBack = false;
  },
};
