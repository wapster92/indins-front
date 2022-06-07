import { Get, Simple, Filter } from 'core-xhr';

export const state = () => ({
  auth: false,
  uid: null,
  username: null,
  isSubscriber: null,
  owner: null,
  userId: null,
  certificateImage: null,
  backgroundImage: null,
  avatar: null,
  logo: null,
  shelter: {
    id: null,
    name: null,
    translatedName: null,
    file: null,
    phone: null,
    address: null,
    email: null,
    owner: null,
    number: null,
    oldNumber: null,
    clubName: null,
    clubId: null,
  },
  bonusPoints: 0,
});

export const mutations = {
  login(state, payload) {
    state.auth = true;
    state.username = payload.username;
    state.owner = payload.name;
    state.isSubscriber = payload.isSubscriber;
    state.uid = payload.uid;
    state.userId = payload.userId;
    state.certificateImage = payload.certificateImage;
    state.backgroundImage = payload.backgroundImage;
    state.avatar = payload.avatar;
    state.logo = payload.logo;
    state.shelter.id = payload.id;
    state.shelter.name = payload.shelterName;
    state.shelter.translatedName = payload.translatedName;
    state.shelter.file = payload.file;
    state.shelter.phone = payload.phone;
    state.shelter.address = payload.address;
    state.shelter.email = payload.email;
    state.shelter.owner = payload.owner;
    state.shelter.number = payload.number;
    state.shelter.oldNumber = payload.oldNumber;
    state.shelter.clubName = payload.clubName;
    state.shelter.clubId = payload.clubId;
  },
  certificateImageAdd(state, payload) {
    state.certificateImage = payload;
  },
  backgroundImageAdd(state, payload) {
    state.backgroundImage = payload;
  },
  avatarAdd(state, payload) {
    state.avatar = payload;
  },
  logoAdd(state, payload) {
    state.logo = payload;
  },
  setBonusPoints(state, payload) {
    state.bonusPoints = payload;
  },
  logout(state) {
    state.auth = false;
    state.uid = null;
    state.isSubscriber = null;
    state.userId = null;
    state.certificateImage = null;
    state.backgroundImage = null;
    state.avatar = null;
    state.logo = null;
    state.username = null;
    state.owner = null;
    state.shelter.id = null;
    state.shelter.name = null;
    state.shelter.translatedName = null;
    state.shelter.file = null;
    state.shelter.phone = null;
    state.shelter.address = null;
    state.shelter.email = null;
    state.shelter.owner = null;
    state.shelter.number = null;
    state.shelter.oldNumber = null;
    state.shelter.clubName = null;
    state.shelter.clubId = null;
    state.bonusPoints = 0;
  },
};

export const actions = {
  actionLogin({ commit }, payload) {
    commit('login', {
      phone: payload.phone,
      uid: payload.uid,
      username: payload.username,
      userId: payload.userId,
      certificateImage: payload.certificateImage,
      backgroundImage: payload.backgroundImage,
      avatar: payload.avatar,
      logo: payload.logo,
      id: payload.id,
      name: payload.name,
      shelterName: payload.shelterName,
      translatedName: payload.translatedName,
      address: payload.address,
      email: payload.email,
      owner: payload.owner,
      number: payload.number,
      oldNumber: payload.oldNumber,
      isSubscriber: payload.isSubscriber,
      clubName: payload.clubName,
      clubId: payload.clubId,
    });
  },
  actionLogout({ commit }) {
    this.$auth.setToken(null);
    this.$cookies.set('auth-token', null);
    commit('logout');
  },
  async auth({ dispatch, commit }) {
    try {
      const result = await this.$xhr.send(new Simple('/api/auth/current-user').authorization());
      const {
        username, uid, isSubscriber, name, certificateImage, backgroundImage, avatar, logo,
      } = result.data.data;
      this.$xhr.send(new Simple(`/api/generate_image/${result.data.data.id}`).authorization()).then(
        certificateImageReq => commit('certificateImageAdd', certificateImageReq.data.result)
      ).catch(e => console.error(e));
      const shelter = await this.$xhr.send(new Get('shelter').entity().addFilter(new Filter('uid', 'eq', uid)));
      const {
        id, phone, translatedName, files, number, oldNumber, owner, club, address, email
      } = shelter.data.data.result;
      dispatch('actionLogin', {
        phone,
        username,
        uid,
        id,
        userId: result.data.data.id,
        certificateImage,
        backgroundImage,
        avatar,
        logo,
        name,
        address,
        email,
        shelterName: shelter.data.data.result.name,
        translatedName,
        file: files[0],
        number,
        owner,
        oldNumber,
        isSubscriber,
        clubName: club?.name || null,
        clubId: club?.id || null,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export const getters = {
  getUser(state) {
    return state;
  },
};
