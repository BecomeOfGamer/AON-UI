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
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
}

export default Element
