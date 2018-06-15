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
    this.createContent = this.createContent.bind(this)
  }

  /**
   * 內文產生並解析屬於數字(num)的部分
   * @param {Array} tooltip
   */
  createContent() {
    const { tooltip } = this.props
    const tags = typeof tooltip.nums !== 'undefined' ? String(tooltip.content).split('{0}') : []

    let render = null
    if (tags.length > 0) {
      render = tags.map((tag, index) => {
        if (index === 0) {
          return (
            <span key={`tip-content-${index}`}>{tag}</span>
          )
        } else {
          // 檢查是不是沒有找到應該填入的替代文字
          const num = tooltip.nums[index - 1]
          if (!num) console.error('Tooltip error, can not find {0} at:', tooltip.content)
          if (!num) this.props.URAPI.debug(`Tooltip error, can not find {0} at: ${tooltip.content}`)
          return (
            <span key={`tip-content-${index}`}>
              <span className={styles.num}>{num || '{0}'}</span>
              <span>{tag}</span>
            </span>
          )
        }
      })
    } else {
      render = <span key={`tip-content-1`}>{tooltip.content}</span>
    }
    return render
  }

  render() {
    const { id, tooltip } = this.props
    return (
      <ReactTooltip id={id} className={styles.tooltip} effect="solid">
        <div className={styles.tool}>
          <div className={[styles.tip, styles.header].join(' ')}>{tooltip.header}</div>
          <span className={styles.tip}>
            {
              this.createContent()
            }
          </span>
          <span className={[styles.tip, styles.unic].join(' ')}>{tooltip.unic}</span>
        </div>
      </ReactTooltip>
    )
  }
}

Tooltip.propTypes = {}

function mapStateToProps(state) {
  return {
    URAPI: state.status.URAPI,
  }
}

export default connect(mapStateToProps)(injectIntl(Tooltip))
