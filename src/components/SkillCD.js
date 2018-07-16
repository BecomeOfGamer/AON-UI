import React from 'react'
import { connect } from 'dva'
import styles from './SkillCD.scss'
import Tooltip from './Tooltip'

import runReversal from '../utils/CDAnimation'
import InterfaceSkill from '../interface/Skill'

class SkillCD extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {
      total: 1000,
      finish: 1000,
      slice1style: {},
      slice2style: {},
      timer: undefined,
      during: 0,
      isRun: false,
    }
    this.start = this.start.bind(this)
  }

  componentDidMount() {
    // Create fake data
    // this.setState({ // eslint-disable-line
    //   slice1style: this.runReversal(1, this.state.finish, this.state.total),
    //   slice2style: this.runReversal(2, this.state.finish, this.state.total),
    // })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  start() {
    const { index, Skills } = this.props
    let skill = new InterfaceSkill()
    skill = Skills[index]

    this.setState({
      finish: this.state.finish + (50 / this.state.during),
    })

    // 執行完畢 或是 可能切換角色
    if (this.state.finish >= 1000 || skill.CurrentCD === skill.MaxCD) {
      clearInterval(this.state.timer)
      this.setState({
        finish: 1000,
        isRun: false,
      })
    }

    this.setState({ // eslint-disable-line
      slice1style: runReversal(1, this.state.finish, this.state.total),
      slice2style: runReversal(2, this.state.finish, this.state.total),
    })

    // 每秒換算範例
    // millisecond = millisecond + 50
    // if (millisecond >= 1000) {
    //   millisecond = 0;
    //   console.log('1 second')
    // }
  }

  render() {
    const { index, Skills } = this.props
    let skill = new InterfaceSkill()
    skill = Skills[index]

    const percent = Number(Number.parseFloat(skill.CDPercent * 100).toFixed(0))

    // 判斷 UE4 是否使用鍵盤觸發技能
    if (this.state.isRun === false && skill.CurrentCD !== skill.MaxCD) {
      this.setState({
        during: skill.MaxCD,
        finish: percent * 10, // 要判斷當前的進度, 決定初始值 (0/1000) 度量衡使用千
        isRun: true,
        timer: setInterval(this.start, 50),
      })
    }

    return (
      <div
        className={styles['skill-cd-group']}
        data-tip
        data-for={`skilltip${index}`}
      >
        <div className={skill.Toggle ? styles['skill-active'] : ''} style={{ 'backgroundImage': 'url(assets/skill-active.png)' }}></div>

        <div className={styles.pie} style={{ 'backgroundImage': `url(${skill.Webpath}` }}>
          <div className={styles.clip1}>
            <div className={styles.slice1} style={this.state.slice1style}></div>
          </div>
          <div className={styles.clip2}>
            <div className={styles.slice2} style={this.state.slice2style}></div>
          </div>
          <div className={styles.status}>
            {percent === 100 || percent === 0 ? '' : `${percent}%`}
            <br />
            Lv.{skill.CurrentLevel}/{skill.MaxLevel}
          </div>
        </div>
        {skill.Tips ? <Tooltip id={`skilltip${index}`} tooltip={skill.Tips} /> : null}
      </div >
    )
  }
}

SkillCD.propTypes = {}

function mapStateToProps(state) {
  return {
    Skills: state.player.Skills,
  }
}

export default connect(mapStateToProps)(SkillCD)
