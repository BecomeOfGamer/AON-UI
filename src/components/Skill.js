import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './Skill.scss'

class Skill extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }
  render() {
    const { intl, api, SkillCanLevelUp } = this.props
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
                <div
                  className={styles.skill}
                  data-key={datakey}
                >
                  <img
                    src={path}
                    alt={path}
                    title={path}
                  />
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
