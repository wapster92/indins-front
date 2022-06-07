import { state, actions, mutations, getters} from 'indify/src/store/scrollManagement'

export default ({app, store}) => {
  if (!store.hasModule('scrollManagement')) {
    store.registerModule('scrollManagement', {
      namespaced: true,
      state,
      getters,
      actions,
      mutations,
    });
  }
}