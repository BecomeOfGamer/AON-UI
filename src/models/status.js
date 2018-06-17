import UnrealAPI from '../api/UnrealAPI'
import Element from '../interface/Element'

const URAPI = new UnrealAPI()

export default {

  namespace: 'status',

  state: {
    progress: 0,
    fps: 0,
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

      // Payload Example
      // const data = JSON.stringify({ data: payload.elements })
      // const dataJSON = {
      //   data: [
      //     { id: 'skill', x: 588, y: 701, w: 523, h: 215 },
      //     { id: 'player', x: 0, y: 661, w: 427, h: 256 },
      //   ],
      // }

      const dataJSON = { data: [] }
      payload.elements.forEach((element, index) => {
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = element.property
        console.log(`${offsetLeft}, ${offsetTop}, ${offsetWidth}, ${offsetHeight}`)
        dataJSON.data.push(new Element(element.id, offsetLeft, offsetTop, offsetWidth, offsetHeight))
      })

      // console.log(dataJSON)
      URAPI.emit('UpdateUIRegion', JSON.stringify(dataJSON))

      return {
        ...state,
        Elements: dataJSON,
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
