export default {

  namespace: 'status',

  state: {
    progress: 0,
    fps: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' })
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    },
    progress(state, { payload }) {
      return {
        ...state,
        progress: payload.progress,
      }
    },
    fps(state, { payload }) {
      return {
        ...state,
        fps: payload.fps,
      }
    },
  },

}
