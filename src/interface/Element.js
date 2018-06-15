/**
 * Element 的座標屬性
 *
 * @class Elements
 */
class Element {

  /**
   * 物件ID
   */
  id = ''

  /**
   * x座標
   */
  x = 0

  /**
   * y座標
   */
  y = 0

  /**
   * 寬度
   */
  w = 0

  /**
   * 高度
   */
  h = 0

  constructor(id, x, y, w, h) {
    this.id = id
    this.x = Math.round(x)
    this.y = Math.round(y)
    this.w = Math.round(w)
    this.h = Math.round(h)
  }
}

export default Element
