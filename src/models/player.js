import UnrealAPI from '../api/UnrealAPI'
import Skill from '../interface/Skill'
import Buff from '../interface/Buff'

// 方便操作, 讓 player 可以在此檔直接調用 api
const unrealapi = new UnrealAPI()

const skill = new Skill()
const buff = new Buff()

const pathPrefix = 'assets/'

export default {

  namespace: 'player',

  state: {
    unrealapi: undefined,
    UnitName: '織田信長',
    TeamId: 0,
    IsAlive: 0,
    CurrentMoveSpeed: 0,
    CurrentMaxHP: 1000,
    CurrentHP: 890,
    CurrentMaxMP: 400,
    CurrentMP: 180,
    CurrentAttackSpeed: 0,
    CurrentLevel: 0,
    CurrentEXP: 0,
    CurrentAttack: 0,
    CurrentArmor: 0,
    CurrentAttackRange: 0,
    Skill_Amount: 4,
    Buff_Amount: 2,
    Skills: [new Skill()],
    Buffs: [new Buff()],
    Skill: ['assets/skill/a02/a02_1.png', 'assets/skill/a02/a02_2.png', 'assets/skill/a02/a02_3.png', 'assets/skill/a02/a02_4.png'],
    SkillCanLevelUp: [true, false, true, false],
    SKillEnabled: [true, true, true, true],
    SKillDisplay: [true, true, true, true],
    SkillTips: [{
      header: '褶裙',
      content: '移動速度+45。',
      unic: '唯一持有，移動速度不得累計。',
      nums: [],
    }, {
      header: '三河魂',
      content: '施放自身的王者之氣，能增加周圍1500友軍{0}的防禦和{0}的跑速。',
      unic: '',
      nums: ['(15/25/35)', '(20/30/40)'],
    }, {
      header: '變硬',
      content: '遇到異性友軍變硬，能增加自身{0}的精神力和{0}的傷害力，持續{0}秒。',
      unic: '唯一擁有，不得與友軍共用。',
      nums: ['(5/10/15)', '(10/20/30)', '(5/6/7)'],
    }, {
      header: '長槍',
      content: '攻擊傷害+14。',
      unic: '',
      nums: [],
    }],
    SkillCDPercent: [1, 1, 1, 1],
    SkillCurrentCD: [0, 0, 0, 0],
    Skilld_MaxCD: [0, 0, 0, 0],
    Buff: ['assets/buff/stun.png', 'assets/buff/stun.png'],
    BuffName: ['暈車', '暈船'],
    BuffTips: [{
      header: '暈車',
      content: '座車上山，山區顛簸暈眩，持續{0}秒。',
      unic: '',
      nums: ['(0.2/0.4/0.6)'],
    }, {
      header: '暈船',
      content: '被異性敵軍騙得團團轉，受其魅惑，持續{0}秒',
      unic: '唯一專情，狀態期間免疫其他異性敵軍。',
      nums: ['(1/2/3)'],
    }],
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

      // ====== 待刪除
      const Skill = []  // eslint-disable-line
      const SkillName = []
      const SkillCanLevelUp = []
      const SkillCDPercent = []
      const SkillTips = []
      for (let i = 1; i <= payload.Skill_Amount; i += 1) {
        Skill.push(pathPrefix + payload[`Skill${i}_Webpath`])
        SkillCanLevelUp.push(payload[`Skill${i}_CanLevelUp`] ? true : false)
        SkillCDPercent.push(payload[`Skill${i}_CDPercent`])
        SkillName.push(payload[`Skill${i}_Name`]) // 暫時用不到
        SkillTips.push({
          header: payload[`Skill${i}_Name`],
          content: payload[`Skill${i}_Description`],
          unic: '',
          nums: [],
        })
      }

      const Buff = []  // eslint-disable-line
      const BuffName = []
      const BuffTips = []
      for (let i = 1; i <= payload.Buff_Amount; i += 1) {
        Buff.push(pathPrefix + payload[`Buff${i}_Webpath`])
        BuffName.push(payload[`Buff${i}_Name`])         // 暫時用不到
        // BuffTips.push(payload[`Buff${i}_BuffTips`])  // 暫時用不到
        BuffTips.push({
          header: payload[`Buff${i}_Name`],
          content: payload[`Buff${i}_BuffTips`],
          unic: '',
          nums: [],
        })
      }
      // ====== 待刪除

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
        // ====== 待刪除
        Skill: Skill,
        SkillTips: SkillTips,
        SkillCDPercent: SkillCDPercent,
        SkillCanLevelUp: SkillCanLevelUp,
        Buff: Buff,
        BuffName: BuffName,
        BuffTips: BuffTips,
        // ====== 待刪除
      }
    },
    skillLevelUp(state, { payload }) {
      if (payload.canup) {
        unrealapi.emit(payload.id, '')
        unrealapi.debug(`skill level up - ${payload.id}`)
      } else {
        unrealapi.debug(`skill can not level up - ${payload.id}`)
      }
      // debug
      // ue.interface.broadcast(payload.id, '')
      // unrealapi.ue.interface.broadcast('skillupimg1', '')
      return state
    },
  },

}
