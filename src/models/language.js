import zhTW from '../locale/zh-TW'

export default {

  namespace: 'language',

  state: {
    locale: 'zh',
    key: 'zh',
    messages: zhTW,
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
      return {
        ...state,
        locale: payload.locale,
        key: payload.key,
        messages: payload.messages,
      }
    },
  },

}
