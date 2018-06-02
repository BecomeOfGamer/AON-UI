
export default {

  namespace: 'example',

  state: {
    count: 0,
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
    add(state, { payload }) {
      return {
        ...state,
        count: state.count + payload.count,
      }
    },
    minus(state) {
      return {
        ...state,
        count: state.count - 1,
      }
    },
  },

}
