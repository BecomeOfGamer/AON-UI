import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './Skill.scss'
import SkillCD from './SkillCD'

import InterSkill from '../interface/Skill'

class Skill extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }

  /**
   * 計算當前血量或魔力比例
   * @param {Number} now
   * @param {Number} all
   */
  percentCaculate(now, all) {
    return `${Number.parseFloat(now / all * 100).toFixed(2)}%`
  }

  render() {
    const { intl, unrealapi, Skills } = this.props
    return (
      <div className={styles['skill-group']}>
        <div className={styles.progress}>
          <div className={styles['progress-text']} >{this.props.CurrentHP} / {this.props.CurrentMaxHP}</div>
          <div className={[styles['progress-bar'], styles['progress-bar-success']].join(' ')} style={{ 'width': `${this.percentCaculate(this.props.CurrentHP, this.props.CurrentMaxHP)}` }}>
          </div>
        </div>
        <div className={styles.progress}>
          <div className={styles['progress-bar']} style={{ 'width': `${this.percentCaculate(this.props.CurrentMP, this.props.CurrentMaxMP)}` }}>
          </div>
          <div className={styles['progress-text']} >{this.props.CurrentMP} / {this.props.CurrentMaxMP}</div>
        </div>
        <div className={styles['skill-list']}>
          {
            Skills.map((skill, index) => {
              let sk = new InterSkill()
              sk = skill
              return (
                <div key={`skill-${index}`}>
                  <div
                    className={[styles['skill-up'], sk.CanLevelUp ? '' : styles.disable].join(' ')}
                    style={{ 'backgroundImage': 'url(assets/plus.png)' }}
                    alt={''}
                    onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { api: unrealapi, id: `skillupimg${index + 1}`, canup: sk.CanLevelUp } })}
                  >
                  </div>
                  <SkillCD
                    src={sk.Webpath}
                    index={index}
                    tooltip={sk.Tips}
                    percent={Number(Number.parseFloat(sk.CDPercent * 100).toFixed(0))}
                    canup={sk.CanLevelUp}
                  />
                </div>
              )
            })
          }
        </div>
      </div >
    )
  }
}

Skill.propTypes = {}

function mapStateToProps(state) {
  return {
    unrealapi: state.player.unrealapi,
    CurrentMaxHP: state.player.CurrentMaxHP,
    CurrentHP: state.player.CurrentHP,
    CurrentMaxMP: state.player.CurrentMaxMP,
    CurrentMP: state.player.CurrentMP,
    Skills: state.player.Skills,
  }
}

export default connect(mapStateToProps)(injectIntl(Skill))
