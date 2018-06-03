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
    const { intl, api, SkillCanLevelUp } = this.props

    const tooltips = [{
      header: '褶裙',
      content: '移動速度+45。',
      unic: '唯一持有，移動速度不得累計。',
    }, {
      header: '三河魂',
      content: '施放自身的王者之氣，能增加周圍1500友軍{0}的防禦。',
      unic: '',
      nums: ['<span className={styles.num}>(15/25/35)</span>'],
    }, {
      header: '天下之勢',
      content: '傷害減少10%，並將減少的傷害轉化為補充自身雙倍的法力。',
      unic: '',
    }, {
      header: '長槍',
      content: '攻擊傷害+14。',
      unic: '',
    }]

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
                  href="#"
                  onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { 'api': api } })}
                >+
                </a>
                <div className={styles.skill} data-key={datakey} >
                  <img src={path} alt={path} title={path} data-tip data-for={`skilltip${index}`} />
                  <Tooltip id={`skilltip${index}`} tooltip={tooltips[index]} />
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
    Skill: state.player.Skill,
    SkillCanLevelUp: state.player.SkillCanLevelUp,
  }
}

export default connect(mapStateToProps)(injectIntl(Skill))
