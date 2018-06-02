
export default {

  namespace: 'player',

  state: {
    HeroName: '',
    CurrentMoveSpeed: 0,
    CurrentHP: 0,
    CurrentAttackSpeed: 0,
    CurrentLevel: 0,
    CurrentAttack: 0,
    CurrentArmor: 0,
    CurrentAttackRange: 0,
    Skill_Amount: 0,
    Buff_Amount: 0,
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
      return {
        ...state,
        HeroName: payload.HeroName,
        CurrentMoveSpeed: payload.CurrentMoveSpeed,
        CurrentHP: payload.CurrentHP,
        CurrentAttackSpeed: Math.floor(payload.CurrentAttackSpeed * 100),
        CurrentLevel: payload.CurrentLevel,
        CurrentAttack: payload.CurrentAttack,
        CurrentArmor: payload.CurrentArmor,
        CurrentAttackRange: payload.CurrentAttackRange,
        Skill_Amount: payload.Skill_Amount,
        Buff_Amount: payload.Buff_Amount,
      }
    },
  },

}
