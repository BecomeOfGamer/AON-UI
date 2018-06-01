export default class UnrealAPI {

  constructor(actions) {

    // models actions
    this.actions = actions

    if (!this.isValid()) return

    // testing
    // this.debug('Hello AON')

    ue.interface.setFPS = this.setFPS.bind(this)
    ue.interface.setProgress = this.setProgress.bind(this)
    ue.interface.hideProgress = this.hideProgress.bind(this)
    ue.interface.setCurrentHero = this.setCurrentHero.bind(this)

  }

  /**
   * check UE library
   */
  isValid() {
    let isvalid = false
    if (
      typeof this.actions !== 'undefined' &&
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
    if (!this.isValid()) return
    if (typeof data !== 'undefined')
      ue.interface.broadcast(name, JSON.stringify(data))
    else
      ue.interface.broadcast(name, '')
  }

  /**
   * Update fps
   * @param {Number} fps 
   */
  setFPS(fps) {
    this.FPS = fps.toFixed(1)
  }

  /**
   * Hidden progressbar
   */
  hideProgress() {
    if (!this.isValid()) return
    //this.debug('hideProgress')
  }

  /**
   * Setting progressbar
   * @param {Number} val 
   */
  setProgress(val) {
    if (!this.isValid()) return
    this.actions.status.update
    //this.debug('setProgress')
  }

  /**
   * Update hero information
   * @param {Object} val 
   */
  setCurrentHero(val) {
    if (!this.isValid()) return
    this.actions.player.update(val)
    //this.debug('setCurrentHero')
  }

}