import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import Tooltip from './Tooltip'
import styles from './Skill.scss'

class Skill extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }
  render() {
    const { intl, unrealapi, SkillCanLevelUp, SkillDetail } = this.props

    // 到時候要改從 models 取得 [2018-06-03-ok]
    // const SkillDetail = [{
    //   header: '褶裙',
    //   content: '移動速度+45。',
    //   unic: '唯一持有，移動速度不得累計。',
    //   nums: [],
    // }, {
    //   header: '三河魂',
    //   content: '施放自身的王者之氣，能增加周圍1500友軍{0}的防禦和{0}的跑速。',
    //   unic: '',
    //   nums: ['(15/25/35)', '(20/30/40)'],
    // }, {
    //   header: '變硬',
    //   content: '遇到女森變硬，能增加自身{0}的精神力和{0}的傷害力，持續{0}秒。',
    //   unic: '',
    //   nums: ['(5/10/15)', '(10/20/30)', '(5/6/7)'],
    // }, {
    //   header: '長槍',
    //   content: '攻擊傷害+14。',
    //   unic: '',
    //   nums: [],
    // }]

    return (
      <div className={styles['skill-group']}>
        <ul className={styles['skill-list']}>
          {this.props.Skill.map((path, index) => {
            let datakey = '?'
            switch (index) {
              case 0:
                datakey = 'Q'
                break
              case 1:
                datakey = 'W'
                break
              case 2:
                datakey = 'E'
                break
              case 3:
                datakey = 'R'
                break
              case 4:
                datakey = 'T'
                break
              case 5:
                datakey = 'D'
                break
              default:
                break
            }
            return (
              <li key={`skillupimg${index}`}>
                <a
                  className={[styles['skill-up'], SkillCanLevelUp[index] ? '' : styles.disable].join(' ')}
                  onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { api: unrealapi } })}
                >+
                </a>
                <div className={styles.skill} data-key={datakey} >
                  <img src={path} alt={path} title={path} data-tip data-for={`skilltip${index}`} />
                  <Tooltip id={`skilltip${index}`} tooltip={SkillDetail[index]} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Skill.propTypes = {}

function mapStateToProps(state) {
  return {
    unrealapi: state.player.unrealapi,
    Skill: state.player.Skill,
    SkillCanLevelUp: state.player.SkillCanLevelUp,
    SkillDetail: state.player.SkillDetail,
  }
}

export default connect(mapStateToProps)(injectIntl(Skill))
