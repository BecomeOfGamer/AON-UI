import UnrealAPI from '../api/UnrealAPI'
import Element from '../interface/Element'

const URAPI = new UnrealAPI()

export default {

  namespace: 'status',

  state: {
    progress: 100,
    fps: 36,
    URAPI: undefined,
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
    connectAPI(state, { payload }) {
      URAPI.connect(payload.dispatch)
      return {
        ...state,
        URAPI: URAPI,
      }
    },
    rect(state, { payload }) {
      // const data = [
      //   { id: 'menu', x: 250, y: 200, w: 120, h: 100 },
      //   { id: 'skill', x: 650, y: 800, w: 600, h: 400 },
      // ]
      // const data = JSON.stringify({ data: payload.elements })

      const data = []
      payload.elements.forEach((element, index) => {
        const { x, y, height, width } = element.rect
        data.push(new Element(element.id, x, y, height, width))
      })

      const dataJSONString = JSON.stringify({ data: data })
      URAPI.emit('UpdateUIRegion', dataJSONString);

      return {
        ...state,
        Elements: dataJSONString,
      }
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
