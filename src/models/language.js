import en from '../i18n/en'
import zhTW from '../i18n/zh-tw'
import zhCN from '../i18n/zh-cn'

export default {

  namespace: 'language',

  state: {
    key: 'zh',
    locale: 'zh-tw',
    messages: zhTW,
    lans: [
      // Add new language here:
      // Example
      // {
      //   locale: 'en',    // 地區設定 https://github.com/yahoo/react-intl
      //   messages: en,  // 要載入的語系檔, 請先 import
      //   icon: 'us',      // 國家圖案 http://flag-icon-css.lip.is/
      // },
      {
        locale: 'en',
        messages: en,
        icon: 'us',
      }, {
        locale: 'zh-tw',
        messages: zhTW,
        icon: 'tw',
      }, {
        locale: 'zh-cn',
        messages: zhCN,
        icon: 'cn',
      }],
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
    /**
     * 更新語系來源
     * @param {*} state
     * @param {*} param1
     */
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
