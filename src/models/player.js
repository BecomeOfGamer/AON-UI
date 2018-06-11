import UnrealAPI from '../api/UnrealAPI'
import Skill from '../interface/Skill'
import Buff from '../interface/Buff'

// Mock 假資料
import MockSkills from '../../mock/MockSkills'
import MockBuffs from '../../mock/MockBuffs'

// 方便操作, 讓 player 可以在此檔直接調用 api
const unrealapi = new UnrealAPI()
const pathPrefix = 'assets/'

export default {

  namespace: 'player',

  state: {
    unrealapi: undefined,
    UnitName: '',
    TeamId: 0,
    IsAlive: 0,
    CurrentMoveSpeed: 0,
    CurrentMaxHP: 0,
    CurrentHP: 0,
    CurrentMaxMP: 0,
    CurrentMP: 0,
    CurrentAttackSpeed: 0,
    CurrentLevel: 0,
    CurrentEXP: 0,
    CurrentAttack: 0,
    CurrentArmor: 0,
    CurrentAttackRange: 0,
    Skill_Amount: 0,
    Buff_Amount: 0,
    // Skills: [],
    // Buffs: [],
    Skills: MockSkills,
    Buffs: MockBuffs,
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
      unrealapi.connect(payload.dispatch)
      return {
        ...state,
        'unrealapi': unrealapi,
      }
    },
    update(state, { payload }) {

      const Skills = []
      for (let i = 1; i <= payload.Skill_Amount; i += 1) {
        const skill = new Skill()
        skill.Name = payload[`Skill${i}_Name`]
        skill.Enabled = payload[`Skill${i}_Enabled`]
        skill.Display = payload[`Skill${i}_Display`]
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
        skill.Tips.unic = ''
        skill.Tips.nums = []
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
        buff.Tips.unic = ''
        buff.Tips.nums = []
        Buffs.push(buff)
      }

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
      }
    },
    skillLevelUp(state, { payload }) {
      if (payload.canup) {
        unrealapi.emit(payload.id, '')
        unrealapi.debug(`技能升級 - ${payload.id}`)
      }
      // debug
      // ue.interface.broadcast(payload.id, '')
      // unrealapi.ue.interface.broadcast('skillupimg1', '')
      return state
    },
  },

}
