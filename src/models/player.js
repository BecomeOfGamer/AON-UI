import Skill from '../interface/Skill'
import Buff from '../interface/Buff'
import HeroCharacter from '../interface/HeroCharacter'

// Mock 假資料
import MockSkills from '../../mock/MockSkills'
import MockBuffs from '../../mock/MockBuffs'
import MockHeroCharacter from '../../mock/MockHeroCharacter'

// 將 skill & buff 移至根目錄, 暫時用不到
// const pathPrefix = 'assets/'
const pathPrefix = ''

export default {

  namespace: 'player',

  state: {
    UnitName: '',
    TeamId: 0,
    IsAlive: 0,
    CurrentMoveSpeed: 0,
    CurrentMaxHP: 1000,
    CurrentHP: 860,
    CurrentMaxMP: 500,
    CurrentMP: 360,
    CurrentAttackSpeed: 120,
    CurrentLevel: 10,
    CurrentEXP: 3000,
    CurrentAttack: 160,
    CurrentArmor: 0,
    CurrentAttackRange: 0,
    Skill_Amount: 0,
    Buff_Amount: 0,
    // Skills: [],
    // Buffs: [],
    // Hero: [],
    Skills: MockSkills,
    Buffs: MockBuffs,
    Hero: MockHeroCharacter,
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
    update(state, { payload }) {

      const Skills = []
      for (let i = 1; i <= payload.Skill_Amount; i += 1) {
        const skill = new Skill()
        skill.Name = payload[`Skill${i}_Name`]
        skill.Enabled = payload[`Skill${i}_Enabled`]
        skill.Display = payload[`Skill${i}_Display`]
        skill.Toggle = payload[`Skill${i}_Toggle`]
        skill.Webpath = pathPrefix + payload[`Skill${i}_Webpath`]
        skill.Description = payload[`Skill${i}_Description`]
        skill.CDPercent = payload[`Skill${i}_CDPercent`]
        skill.CurrentCD = payload[`Skill${i}_CurrentCD`]
        skill.MaxCD = payload[`Skill${i}_MaxCD`]
        skill.CanLevelUp = payload[`Skill${i}_CanLevelUp`]
        skill.CurrentLevel = payload[`Skill${i}_CurrentLevel`]
        skill.MaxLevel = payload[`Skill${i}_MaxLevel`]
        skill.Tips.header = payload[`Skill${i}_Name`]
        skill.Tips.content = payload[`Skill${i}_Description`]
        Skills.push(skill)
      }

      const Buffs = []
      for (let i = 1; i <= payload.Buff_Amount; i += 1) {
        const buff = new Buff()
        buff.Name = payload[`Buff${i}_Name`]
        buff.Webpath = pathPrefix + payload[`Buff${i}_Webpath`]
        buff.Friendly = payload[`Buff${i}_Friendly`]
        buff.BuffTips = payload[`Buff${i}_BuffTips`]
        buff.Stacks = payload[`Buff${i}_Stacks`]
        buff.Duration = payload[`Buff${i}_Duration`]
        buff.MaxDuration = payload[`Buff${i}_MaxDuration`]
        buff.CanStacks = payload[`Buff${i}_CanStacks`]
        buff.Tips.header = payload[`Buff${i}_Name`]
        buff.Tips.content = payload[`Buff${i}_BuffTips`]
        Buffs.push(buff)
      }

      const hero = new HeroCharacter()
      hero.Strength = payload.Strength
      hero.Agility = payload.Agility
      hero.Intelligence = payload.Intelligence
      hero.AdditionStrength = payload.AdditionStrength
      hero.AdditionAgility = payload.AdditionAgility
      hero.AdditionIntelligence = payload.AdditionIntelligence
      hero.DeadTime = payload.DeadTime
      hero.BountyEXP = payload.BountyEXP
      hero.CurrentLevel = payload.CurrentLevel
      hero.CurrentEXP = payload.CurrentEXP

      return {
        ...state,
        UnitName: payload.UnitName,
        CurrentMoveSpeed: payload.CurrentMoveSpeed,
        CurrentMaxHP: payload.CurrentMaxHP,
        CurrentHP: payload.CurrentHP,
        CurrentMaxMP: payload.CurrentMaxMP,
        CurrentMP: payload.CurrentMP,
        CurrentAttackSpeed: Math.floor(payload.CurrentAttackSpeed * 100),
        CurrentLevel: payload.CurrentLevel,
        CurrentEXP: payload.CurrentEXP,
        CurrentAttack: payload.CurrentAttack,
        CurrentArmor: payload.CurrentArmor,
        CurrentAttackRange: payload.CurrentAttackRange,
        Skill_Amount: payload.Skill_Amount,
        Buff_Amount: payload.Buff_Amount,
        Skills: Skills,
        Buffs: Buffs,
        Hero: hero,
      }
    },

    /**
     * 技能使用
     * @param {*} state
     * @param {*} param1
     */
    skill(state, { payload }) {
      const URAPI = payload.URAPI
      URAPI.emit(`skill${payload.id}`, '')
      URAPI.debug(`技能使用 - skill${payload.id}`)
      return state
    },

    /**
     * 技能升級
     * @param {*} state
     * @param {*} param1
     */
    skillLevelUp(state, { payload }) {
      const URAPI = payload.URAPI
      if (payload.canup) {
        URAPI.emit(`skillupimg${payload.id}`, '')
        URAPI.debug(`技能升級 - skillupimg${payload.id}`)
      }
      return state
    },
  },

}
