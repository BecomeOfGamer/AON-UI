export default class UnrealAPI {
  constructor() {
    this.dispatch = undefined
    this.connect = this.connect.bind(this)
  }

  /**
   * Connect to ue4
   * @param {Object} dispatch player models
   */
  connect(dispatch) {
    this.dispatch = dispatch
    if (!this.isValid()) return
    ue.interface.setFPS = this.setFPS.bind(this)
    ue.interface.setProgress = this.setProgress.bind(this)
    ue.interface.hideProgress = this.hideProgress.bind(this)
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
    // if (!isvalid) alert('You are not in unreal engine.')
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
      alert(e)
    }
  }

  /**
   * Update fps
   * @param {Number} fps
   */
  setFPS(fps) {
    if (!this.isValid()) return
    this.dispatch({ type: 'status/ftp', payload: { ftp: fps.toFixed(1) } })
  }

  /**
   * Hidden progressbar
   */
  hideProgress() {
    if (!this.isValid()) return
    // this.debug('hideProgress')
  }

  /**
   * Setting progressbar
   * @param {Number} val
   */
  setProgress(val) {
    if (!this.isValid()) return
    this.dispatch({ type: 'status/progress', payload: { progress: val } })
    // this.debug('setProgress')
  }

  /**
   * Update hero information
   * @param {Object} val
   */
  setCurrentHero(val) {
    if (!this.isValid()) return
    this.dispatch({ type: 'player/update', payload: val })
    // this.debug('setCurrentHero')
  }

  /**
   * Emit event when lost focus
   */
  lostFocusUnit() {
    this.debug('lost focus')
  }

}
