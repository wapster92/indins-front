import { Get, Simple } from 'core-xhr';

export const state = () => ({
  isGet: false,
  email: null,
  header: null,
  metaDescription: null,
  metaKeywords: null,
  metaTitle: null,
  phone: null,
  urlFaceBook: null,
  urlInstagram: null,
  urlVk: null,
  urlYoutube: null,
});

export const mutations = {
  setSettings(state, payload) {
    state.isGet = true;
    state.email = payload.email;
    state.header = payload.header;
    state.metaDescription = payload.metaDescription;
    state.metaKeywords = payload.metaKeywords;
    state.metaTitle = payload.metaTitle;
    state.phone = payload.phone;
    state.urlFaceBook = payload.urlFaceBook;
    state.urlInstagram = payload.urlInstagram;
    state.urlVk = payload.urlVk;
    state.urlYoutube = payload.urlYoutube;
  },
};

export const actions = {
  async setSettings({ commit }) {
    try {
      await this.$xhr.send(new Simple('/api/settings')).then(res => {
        commit('setSettings', res.data);
      });
    } catch (e) {
      console.error(e);
    }
  },
};

export const getters = {
  settings(state) {
    return state;
  },
};
