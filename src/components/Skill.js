import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './Skill.scss'
import SkillCD from './SkillCD'

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
    const { intl, unrealapi, SkillCanLevelUp, SkillCDPercent, SkillTips } = this.props

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
            this.props.Skill.map((path, index) => {
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
                <div key={`skill-${index}`}>
                  <div
                    className={[styles['skill-up'], SkillCanLevelUp[index] ? '' : styles.disable].join(' ')}
                    style={{ 'backgroundImage': 'url(assets/plus.png)' }}
                    alt={''}
                    onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { api: unrealapi, id: `skillupimg${index + 1}`, canup: SkillCanLevelUp[index] } })}
                  >
                  </div>
                  {/*
                  <div className={styles.skill} data-key={datakey} >
                      <img
                      src={path}
                      alt={''}
                      data-tip
                      data-for={`skilltip${index}`}
                      onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { api: unrealapi, id: `skillupimg${index + 1}`, canup: SkillCanLevelUp[index] } })}
                    />
                    <Tooltip id={`skilltip${index}`} tooltip={SkillTips[index]} />
                  </div>
                  */}
                  <SkillCD
                    src={path}
                    index={index}
                    tooltip={SkillTips[index]}
                    percent={Number.parseFloat(SkillCDPercent[index] * 100).toFixed(0)}
                    canup={SkillCanLevelUp[index]}
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
    Skill: state.player.Skill,
    CurrentMaxHP: state.player.CurrentMaxHP,
    CurrentHP: state.player.CurrentHP,
    CurrentMaxMP: state.player.CurrentMaxMP,
    CurrentMP: state.player.CurrentMP,
    SkillCanLevelUp: state.player.SkillCanLevelUp,
    SkillCDPercent: state.player.SkillCDPercent,
    SkillTips: state.player.SkillTips,
  }
}

export default connect(mapStateToProps)(injectIntl(Skill))
