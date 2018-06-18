import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import ReactTooltip from 'react-tooltip'
// https://github.com/wwayne/react-tooltip
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

    /**
     * TAG 說明
     *
     * num      - 數值
     * comment  - 註解
     * unique   - 唯一性
     * heavy    - 重點
     * str      - 力量附加
     * agi      - 敏捷附加
     * int      - 智慧附加
     */

    // 直接使用 UE4 給的樣板
    return <div dangerouslySetInnerHTML={{ __html: tooltip.content || '' }} /> // eslint-disable-line

  }

  render() {
    const { id, tooltip } = this.props
    return (
      <ReactTooltip id={id} className={styles.tooltip} effect="solid" offset={{ top: 20, left: 10 }}>
        <div className={styles.tool}>
          <div className={[styles.tip, styles.header].join(' ')}>{tooltip.header}</div>
          <span className={styles.tip}>
            {
              this.createContent()
            }
          </span>
          {/* <span className={[styles.tip, styles.unique].join(' ')}>{tooltip.unic}</span> */}
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
