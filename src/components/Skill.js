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

    return (
      <div className={styles['skill-group']}>
        <ul className={styles['skill-list']}>
          {this.props.Skill.map((path, index) => {
            let datakey = '?'
            switch (index) {
              case 0:
                datakey = 'W'
                break
              case 1:
                datakey = 'E'
                break
              case 2:
                datakey = 'R'
                break
              case 3:
                datakey = 'T'
                break
              case 4:
                datakey = 'R'
                break
              case 5:
                datakey = 'D'
                break
              default:
                break
            }
            return (
              <li key={`skillupimg${index}`}>
                <img
                  className={[styles['skill-up'], SkillCanLevelUp[index] ? '' : styles.disable].join(' ')}
                  onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { api: unrealapi, id: `skillupimg${index + 1}` } })}
                  src={'assets/plus.png'}
                  alt={''}
                />
                <div className={styles.skill} data-key={datakey} >
                  <img
                    src={path}
                    alt={path}
                    data-tip
                    data-for={`skilltip${index}`}
                    onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { api: unrealapi, id: `skillupimg${index + 1}` } })}
                  />
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
