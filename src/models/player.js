import UnrealAPI from '../api/UnrealAPI'

// 方便操作, 讓 player 可以在此檔直接調用 api
const unrealapi = new UnrealAPI()
const pathPrefix = 'assets/'

export default {

  namespace: 'player',

  state: {
    unrealapi: undefined,
    UnitName: '織田信長',
    CurrentMoveSpeed: 0,
    CurrentHP: 0,
    CurrentAttackSpeed: 0,
    CurrentLevel: 0,
    CurrentAttack: 0,
    CurrentArmor: 0,
    CurrentAttackRange: 0,
    Skill_Amount: 4,
    Skill: ['assets/skill/a02/a02_1.png', 'assets/skill/a02/a02_2.png', 'assets/skill/a02/a02_3.png', 'assets/skill/a02/a02_4.png'],
    SkillCanLevelUp: [true, false, true, false],
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
    SkillCDPercent: [0, 0, 0, 0],
    Buff_Amount: 2,
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
      const Skill = []
      const SkillCanLevelUp = []
      for (let i = 1; i <= payload.Skill_Amount; i += 1) {
        Skill.push(pathPrefix + payload[`Skill${i}_Webpath`])
        if (payload[`Skill${i}_CanLevelUp`])
          SkillCanLevelUp.push(true)
        else
          SkillCanLevelUp.push(false)
      }
      const Buff = []
      const BuffName = []
      const BuffTips = []
      for (let i = 1; i <= payload.Buff_Amount; i += 1) {
        Buff.push(pathPrefix + payload[`Buff${i}_Webpath`])
        BuffName.push(payload[`Buff${i}_Name`])
        // BuffTips.push(payload[`Buff${i}_BuffTips`])
        BuffTips.push({
          header: payload[`Buff${i}_Name`],
          content: payload[`Buff${i}_BuffTips`],
          unic: '',
          nums: [],
        })
      }
      return {
        ...state,
        UnitName: payload.UnitName,
        CurrentMoveSpeed: payload.CurrentMoveSpeed,
        CurrentHP: payload.CurrentHP,
        CurrentAttackSpeed: Math.floor(payload.CurrentAttackSpeed * 100),
        CurrentLevel: payload.CurrentLevel,
        CurrentAttack: payload.CurrentAttack,
        CurrentArmor: payload.CurrentArmor,
        CurrentAttackRange: payload.CurrentAttackRange,
        Skill_Amount: payload.Skill_Amount,
        'Skill': Skill,
        'SkillCanLevelUp': SkillCanLevelUp,
        Buff_Amount: payload.Buff_Amount,
        'Buff': Buff,
        'BuffName': BuffName,
        'BuffTips': BuffTips,
      }
    },
    skillLevelUp(state, { payload }) {
      unrealapi.emit(payload.id, '')
      unrealapi.debug(`skill level up - ${payload.id}`)
      // debug
      // ue.interface.broadcast(payload.id, '')
      // unrealapi.ue.interface.broadcast('skillupimg1', '')
      return state
    },
  },

}
