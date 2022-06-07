import {state,actions,mutations,getters} from 'indify/src/store/preloader'

export default ({app, store}) => {
  if (!store.hasModule('preloader')) {
    store.registerModule('preloader', {
      namespaced: true,
      state,
      actions,
      mutations,
      getters,
    });
  }
}