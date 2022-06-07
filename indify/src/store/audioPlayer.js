const AUDIO_STATE = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  STOP: 'STOP'
}

export const state = () => ({
  current: null,
  next: null,
  audioList: [],
  audioState: null
});

export const mutations = {
  setCurrent(state, value) {
    state.current = value;
  },
  setNext(state, value) {
    state.next = value;
  },
  setAudioList(state, value) {
    state.audioList = value;
  },
  setAudioState(state, value) {
    state.audioState = value;
  }
};

export const actions = {
  addTrackToAudioList({ commit, state }, value) {
    const list = [...state.audioList];
    list.push(value)

    list.sort((a, b) => a._uid - b._uid)

    commit('setAudioList', list)
  },
  removeTrackToAudioList(state, value) {
    const index = state.audioList.indexOf(value);

    if (~index) {
      return;
    }

    const list = [...state.audioList.slice(0, index), ...state.audioList.slice(index + 1)];
    commit('setAudioList', list);
  },

  setCurrent({ dispatch, commit, state }, value) {
    commit('setCurrent', value);

    let next;
    state.audioList.forEach((el, i, list) => {
      if (el._uid === value) {
        next = list[i + 1]?._uid || list[0]?._uid;
      }
    });

    dispatch('setNext', next)
  },

  setNext({ commit }, value) {
    commit('setNext', value);
  },

  setAudioState({ dispatch, commit, state }, value) {
    if (!AUDIO_STATE[value]) {
      return;
    }

    if (value === AUDIO_STATE.STOP) {
      dispatch('setCurrent', state.next)
    }

    commit('setAudioState', AUDIO_STATE[value]);
  }
};
