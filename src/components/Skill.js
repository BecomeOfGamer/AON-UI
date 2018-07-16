import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './Skill.scss'
import SkillCD from './SkillCD'

import InterfaceSkill from '../interface/Skill'
import PlayerLife from './PlayerLife'

class Skill extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }

  render() {
    const { intl, URAPI, Skills } = this.props
    return (
      <div id="skill" className={styles['skill-group']}>
        <div className={styles['skill-panel']}>
          <div className={styles['skill-list']}>
            {
              Skills.map((sk, index) => {
                let skill = new InterfaceSkill()
                skill = sk
                return (
                  <div key={`skill-${index}`}>
                    <div
                      className={[styles['skill-up'], skill.CanLevelUp ? '' : styles.disable].join(' ')}
                      style={{ 'backgroundImage': 'url(assets/plus.png)' }}
                      alt={''}
                      onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { URAPI: URAPI, id: `${index + 1}`, canup: skill.CanLevelUp } })}
                    >
                    </div>

                    {skill.Display ? <SkillCD index={index} /> : null}

                    <div className={[styles['skill-level']]}>
                      {
                        // 技能等級格子
                        [0].map(level => {
                          const levelArr = []
                          for (let i = 1; i <= skill.MaxLevel; i += 1) {
                            levelArr.push(
                              <div
                                key={`skill-level-${i}`}
                                className={[styles['skill-level-current'], skill.CurrentLevel >= i ? styles.valid : ''].join(' ')}
                              >
                              </div>
                            )
                          }
                          return (levelArr)
                        })
                      }
                    </div>

                  </div>
                )
              })
            }
          </div>

          { /* Hero Status ( 血條與魔力 ) */}
          <PlayerLife />

        </div>
      </div >
    )
  }
}

Skill.propTypes = {}

function mapStateToProps(state) {
  return {
    URAPI: state.status.URAPI,
    Skills: state.player.Skills,
  }
}

export default connect(mapStateToProps)(injectIntl(Skill))
