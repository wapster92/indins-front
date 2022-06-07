import {state,actions,mutations} from 'indify/src/store/snack'

export default ({app, store}) => {
  if (!store.hasModule('snack')) {
    store.registerModule('snack', {
      namespaced: true,
      state,
      actions,
      mutations
    });
  }
}