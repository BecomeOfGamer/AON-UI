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
      // const data = JSON.stringify({ data: payload.elements })
      // const dataJSON = {
      //   data: [
      //     { id: 'skill', x: 588, y: 701, w: 523, h: 215 },
      //     { id: 'player', x: 0, y: 661, w: 427, h: 256 },
      //   ],
      // }

      const dataJSON = { data: [] }
      payload.elements.forEach((element, index) => {
        // const { x, y, width, height } = element.rect
        const rect = element.rect
        // dataJSON.data.push(new Element(element.id, rect.x, rect.y, rect.width, rect.height))
        URAPI.debug(`${typeof rect.x} - ${rect.x}`)
        console.log(`${typeof rect.x} - ${rect.x}`)
        dataJSON.data[index] = {
          id: String(element.id),
          x: Math.round(Number(rect.x)),
          y: Math.round(Number(701)),
          w: Math.round(rect.width * 2),
          h: Math.round(rect.height * 1.5),
        }
      })

      console.log(dataJSON)
      // URAPI.emit('UpdateUIRegion', JSON.stringify(dataJSON))

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
