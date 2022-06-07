import autosaveStore from 'indify/src/store/autosaveStore.js'

export default ({app, store}) => {
  if (!store.hasModule('autosaveStore')) {
    store.registerModule('autosaveStore', {
      namespaced: true,
      ...autosaveStore,
    });
  }
}