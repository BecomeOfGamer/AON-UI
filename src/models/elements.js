import Element from '../interface/Element'

export default {

  namespace: 'elements',

  state: {
    Elements: [],
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
    update(state, { payload }) {

      console.log(payload.element)

      return {
        ...state,
        Elements: payload.element,
      }
    },
  },

}
