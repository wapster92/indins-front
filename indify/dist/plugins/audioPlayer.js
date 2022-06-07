import {state,actions,mutations} from 'indify/src/store/audioPlayer'

export default ({app, store}) => {
  if (!store.hasModule('audio-player')) {
    store.registerModule('audio-player', {
      namespaced: true,
      state,
      actions,
      mutations
    });
  }
}