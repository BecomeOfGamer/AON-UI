
const pathPrefix = 'assets/'

export default {

  namespace: 'player',

  state: {
    UnitName: '織田信長',
    CurrentMoveSpeed: 0,
    CurrentHP: 0,
    CurrentAttackSpeed: 0,
    CurrentLevel: 0,
    CurrentAttack: 0,
    CurrentArmor: 0,
    CurrentAttackRange: 0,
    Skill_Amount: 0,
    Buff_Amount: 0,
    Skill: ['assets/skill/a02/a02_1.png', 'assets/skill/a02/a02_2.png', 'assets/skill/a02/a02_3.png', 'assets/skill/a02/a02_4.png'],
    Buff: ['assets/buff/stun.png'],
    SkillCanLevelUp: [true, false, true, false],
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
      const Skill = []
      const SkillCanLevelUp = []
      for (let i = 1; i <= payload.Skill_Amount; i += 1) {
        Skill.push(pathPrefix + payload[`Skill${i}_Webpath`])
        if (payload[`Skill${i}_CanLevelUp`])
          SkillCanLevelUp.push(true)
        else
          SkillCanLevelUp.push(false)
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
        Buff_Amount: payload.Buff_Amount,
        'Skill': Skill,
        'SkillCanLevelUp': SkillCanLevelUp,
      }
    },
    skillLevelUp(state, { payload }) {
      try {
        payload.api.emit('skillupimg1', {})
        // payload.api.debug(`${payload.target} skill up!`)
      } catch (e) {
        alert(e)
      }
      return { ...state }
    },
  },

}
