import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './Skill.scss'
import SkillCD from './SkillCD'

import InterfaceSkill from '../interface/Skill'
import Element from '../interface/Element';

class Skill extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }

  componentDidMount() {
    const els = []
    const objs = document.querySelectorAll(`.${styles['skill-up']}`)
    objs.forEach(obj => {
      const DOMRect = obj.getBoundingClientRect()
      els.push(
        new Element(
          obj.className,
          DOMRect.height,
          DOMRect.width,
          DOMRect.x,
          DOMRect.y
        ))
    });
    console.log(els)
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
          <div className={styles['progress-text']}>{this.props.CurrentHP} / {this.props.CurrentMaxHP}</div>
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
            Skills.map((sk, index) => {
              let skill = new InterfaceSkill()
              skill = sk
              return (
                <div key={`skill-${index}`}>
                  <div
                    className={[styles['skill-up'], skill.CanLevelUp ? '' : styles.disable].join(' ')}
                    style={{ 'backgroundImage': 'url(assets/plus.png)' }}
                    alt={''}
                    onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { api: unrealapi, id: `skillupimg${index + 1}`, canup: skill.CanLevelUp } })}
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
    Elements: state.elements.Elements,
  }
}

export default connect(mapStateToProps)(injectIntl(Skill))
