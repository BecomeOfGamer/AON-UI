import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import Tooltip from './Tooltip'
import styles from './Buff.scss'

import InterfaceBuff from '../interface/Buff'

class Buff extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {
      total: 1000,
      finish: 700,
      slice1style: {},
      slice2style: {},
      timer: undefined,
      during: 0,// Math.floor(Math.random() * 9) + 2,
      isRun: false,
    }
    // this.start = this.start.bind(this)
  }

  componentDidMount() {
    // Create fake data
    this.setState({ // eslint-disable-line
      slice1style: this.runReversal(1, this.state.finish, this.state.total),
      slice2style: this.runReversal(2, this.state.finish, this.state.total),
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  start() {
    const { index, Buffs } = this.props
    const buff = Buffs[index]

    this.setState({
      finish: this.state.finish + (50 / this.state.during),
    })

    // 執行完畢 或是 可能切換角色
    if (this.state.finish >= 1000 || buff.CurrentCD === buff.MaxCD) {
      clearInterval(this.state.timer)
      this.setState({
        finish: 1000,
        isRun: false,
      })
    }

    this.setState({ // eslint-disable-line
      slice1style: this.runReversal(1, this.state.finish, this.state.total),
      slice2style: this.runReversal(2, this.state.finish, this.state.total),
    })

    // 每秒換算範例
    // millisecond = millisecond + 50
    // if (millisecond >= 1000) {
    //   millisecond = 0;
    //   console.log('1 second')
    // }
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
    const { intl, Buffs } = this.props

    return (
      <div className={[styles['buff-group'], Buffs.length === 0 ? styles.disable : ''].join(' ')}>
        {
          Buffs.map((bf, index) => {
            let buff = new InterfaceBuff()
            buff = bf

            // const percent = Number(Number.parseFloat(buff.CDPercent * 100).toFixed(0))

            // 判斷 UE4 是否使用鍵盤觸發技能
            // if (this.state.isRun === false && buff.CurrentCD !== buff.MaxCD) {
            //   this.setState({
            //     during: buf.MaxCD,
            //     finish: percent * 10, // 要判斷當前的進度, 決定初始值 (0/1000) 度量衡使用千
            //     isRun: true,
            //     timer: setInterval(this.start, 50),
            //   })
            // }

            return (
              <div
                className={styles['buff-box']}
                key={`buff-${index}`}
                data-tip
                data-for={`bufftip${index}`}
              >
                <div className={styles.pie} style={{ 'backgroundImage': `url(${buff.Webpath}` }}>
                  <div className={styles.clip1}>
                    <div className={styles.slice1} style={this.state.slice1style}></div>
                  </div>
                  <div className={styles.clip2}>
                    <div className={styles.slice2} style={this.state.slice2style}></div>
                  </div>
                  <div className={styles.status}>
                    {/* percent === 100 || percent === 0 ? '' : `${percent}% */}
                  </div>
                </div>
                <Tooltip id={`bufftip${index}`} tooltip={buff.Tips} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

Buff.propTypes = {}

function mapStateToProps(state) {
  return {
    Buffs: state.player.Buffs,
  }
}

export default connect(mapStateToProps)(injectIntl(Buff))
