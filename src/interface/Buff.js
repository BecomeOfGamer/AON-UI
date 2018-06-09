import Tips from './Tips'

/**
 * 承接 UE4 的 Buff 類別
 *
 * @class Buff
 */
class Buff {

  /**
   * String 名稱
   */
  Name = ''

  /**
   * String 圖片路徑
   */
  Webpath = ''

  /**
   * Boolean 是否是增益（否為減益）
   */
  Friendly = false

  /**
   * String 提示
   */
  BuffTips = ''

  /**
   * Number 堆疊成數
   */
  Stacks = 0

  /**
   * Number 持續剩餘時間
   */
  Duration = 0

  /**
   * Number 持續總時間
   */
  MaxDuration = 0

  /**
   * Boolean 是否可堆疊
   */
  CanStacks = false

  /**
   * Object Buff提示(重新組合)
   */
  Tips = new Tips()

}

export default Buff
