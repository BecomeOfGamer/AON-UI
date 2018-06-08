import React from 'react'
import { connect } from 'dva'
import styles from './SkillCD.scss'
import Tooltip from './Tooltip'

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
      during: Math.floor(Math.random() * 9) + 2, // 待 UE4 發送技能持續時間
    }
    this.start = this.start.bind(this)
  }

  componentDidMount() {
    this.setState({ // eslint-disable-line
      slice1style: this.runReversal(1, this.state.finish, this.state.total),
      slice2style: this.runReversal(2, this.state.finish, this.state.total),
    })
    // if (typeof this.timer === 'undefined') {
    //   this.setState({ // eslint-disable-line
    //     timer: setInterval(this.start, 50),
    //   })
    // }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  start() {
    this.setState({
      finish: this.state.finish + (50 / this.state.during),
    })
    // millisecond = millisecond + 50
    // if (millisecond >= 1000) {
    //   millisecond = 0;
    //   console.log('1 second')
    // }
    if (this.state.finish >= 1000) {
      this.setState({
        finish: 0,
      })
      clearInterval(this.state.timer)
    }
    this.setState({ // eslint-disable-line
      slice1style: this.runReversal(1, this.state.finish, this.state.total),
      slice2style: this.runReversal(2, this.state.finish, this.state.total),
    })
  }

  /**
   * Run caculateReversal
   * @param {Number} id target
   * @param {Number} finish finish percents
   * @param {Number} total total percents
   */
  runReversal(id, finish, total) {
    switch (id) {
      case 1:
        return this.rotate(this.caculateReversal(finish, total).first)
      case 2:
        return this.rotate(this.caculateReversal(finish, total).second)
      default:
        return {}
    }
  }

  /**
   * Set rotate
   * @param {Number} degree rotate
   */
  rotate(degree) {
    return {
      'WebkitTransform': `rotate(${degree}deg)`,
      'MozTransform': `rotate(${degree}degg)`,
      'msTransform': `rotate(${degree}deg)`,
      'OTransform': `rotate(${degree}deg)`,
      'transform': `rotate(${degree}deg)`,
      'zoom': 1,
    }
  }

  /**
   * CaculateReversal rotate
   * @param {Number} finish finish percents
   * @param {Number} total total percents
   */
  caculateReversal(finish, total) {
    const remain = total - finish
    let firstHalfAngle = 0
    let secondHalfAngle = 180
    const drawAngle = remain / total * 360
    if (drawAngle >= 180) {
      firstHalfAngle = (drawAngle - 180) * -1
    } else {
      secondHalfAngle = drawAngle * -1
    }
    return {
      first: firstHalfAngle,
      second: secondHalfAngle,
    }
  }

  /**
   * Caculate rotate
   * @param {Number} finish finish percents
   * @param {Number} all total percents
   */
  caculate(finish, total) {
    let firstHalfAngle = 180
    let secondHalfAngle = 0
    const drawAngle = finish / total * 360
    if (drawAngle <= 180) {
      firstHalfAngle = drawAngle
    } else {
      secondHalfAngle = drawAngle - 180
    }
    return {
      first: firstHalfAngle,
      second: secondHalfAngle,
    }
  }

  render() {
    const { unrealapi, index, canup, src, tooltip, percent } = this.props
    return (
      <div
        className={styles['skill-cd-group']}
        data-tip
        data-for={`skilltip${index}`}
        onClick={() => {
          if (this.state.finish > 0 && this.state.finish < 1000) {
            console.warn('skill cd not yet.')
            return
          }
          this.setState({
            finish: 0,
            timer: setInterval(this.start, 50),
          })
          this.dispatch({ type: 'player/skillLevelUp', payload: { api: unrealapi, id: `skillupimg${index + 1}`, 'canup': canup } })
        }
        }
      >
        <div className={styles.pie} style={{ 'backgroundImage': `url(${src}` }}>
          <div className={styles.clip1}>
            <div className={styles.slice1} style={this.state.slice1style}></div>
          </div>
          <div className={styles.clip2}>
            <div className={styles.slice2} style={this.state.slice2style}></div>
          </div>
          <div className={styles.status}>
            {/* `${Number.parseFloat(this.state.finish / 10).toFixed(0)} %` */}
            {`${percent < 100 && percent > 0 ? `${percent}` : ''}`}
          </div>
        </div>
        {tooltip ? <Tooltip id={`skilltip${index}`} tooltip={tooltip} /> : null}
      </div >
    )
  }
}

SkillCD.propTypes = {}

function mapStateToProps(state) {
  return {
    unrealapi: state.player.unrealapi,
  }
}

export default connect(mapStateToProps)(SkillCD)
