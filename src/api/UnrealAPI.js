export default class UnrealAPI {
  constructor() {
    this.dispatch = undefined
    this.connect = this.connect.bind(this)
  }

  /**
   * Connect to UE4
   * @param {Object} dispatch models
   */
  connect(dispatch) {
    this.dispatch = dispatch
    if (!this.isValid()) return
    ue.interface.setCurrentHero = this.setCurrentHero.bind(this)
    ue.interface.lostFocusUnit = this.lostFocusUnit.bind(this)
    this.debug('Connect to Unreal API')
  }

  /**
   * Check UE library
   */
  isValid() {
    let isvalid = false
    if (
      typeof this.dispatch !== 'undefined' &&
      typeof ue === 'object' &&
      typeof ue.interface === 'object'
    ) {
      isvalid = typeof ue.interface.broadcast === 'function' ? true : false
    }
    if (!isvalid) console.warn('You are not in unreal engine.')
    return isvalid
  }

  /**
   * Console Debug Message
   * @param {any} payload Message
   */
  debug(payload) {
    if (!this.isValid()) return
    if (typeof payload === 'undefined') return
    this.emit('debug', payload)
  }

  /**
   * Event Emitter
   * @param {String} name Target element
   * @param {Object} data Payload
   */
  emit(name, data) {
    try {
      if (!this.isValid()) return
      if (typeof data !== 'undefined') {
        ue.interface.broadcast(name, JSON.stringify(data))
      } else {
        ue.interface.broadcast(name, '')
      }
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Update hero information
   * @param {Object} val
   */
  setCurrentHero(val) {
    if (!this.isValid()) return
    this.dispatch({ type: 'status/setPanelVisible', payload: { show: true } })
    this.dispatch({ type: 'player/update', payload: val })
    // this.debug('setCurrentHero')
  }

  /**
   * Emit event when lost focus
   */
  lostFocusUnit() {
    if (!this.isValid()) return
    this.dispatch({ type: 'status/setPanelVisible', payload: { show: false } })
    // this.debug('lostFocusUnit')
  }

}
