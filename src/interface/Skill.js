import Tips from './Tips'

/**
 * 承接 UE4 的 Skill 類別
 *
 * @class Skill
 */
class Skill {

  /**
   * 技能名稱
   */
  Name = ''

  /**
   * 是否啟用(有效性)
   */
  Enabled = true

  /**
   * 是否顯示
   */
  Display = true

  /**
   * 是否開啟(持續性)
   */
  Toggle = false

  /**
   * 圖片路徑
   */
  Webpath = ''

  /**
   * 技能描述
   */
  Description = ''

  /**
   * CD百分比
   */
  CDPercent = 1

  /**
   * 目前CD時間
   */
  CurrentCD = 0

  /**
   * 目前最大CD時間
   */
  MaxCD = 0

  /**
   * 該技能目前可不可以升級
   */
  CanLevelUp = true

  /**
   * 技能等級
   */
  CurrentLevel = 0

  /**
   * 技能最大等級
   */
  MaxLevel = 0

  /**
   * 技能提示(重新組合)
   */
  Tips = new Tips()

}

export default Skill
