import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import ReactTooltip from 'react-tooltip'
import styles from './Tooltip.scss'

class Tooltip extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }
  render() {
    const { id, tooltip } = this.props
    // const nums = Array(tooltip.nums)
    // const num = []
    // for (let i = 0; i < nums.length; i += 1) {
    //   num.push(nums[i])
    // }
    // console.log(num)
    // 要換方法了, split('{0}') 索引對應到 nums
    return (
      <ReactTooltip id={id} className={styles.tooltip} effect="solid">
        <div className={styles.tool}>
          <div className={[styles.tip, styles.header].join(' ')}>{tooltip.header}</div>
          <span className={[styles.tip, styles.content].join(' ')}>{tooltip.content}</span>
          <span className={[styles.tip, styles.unic].join(' ')}>{tooltip.unic}</span>
        </div>
      </ReactTooltip>
    )
  }
}

Tooltip.propTypes = {}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(injectIntl(Tooltip))
