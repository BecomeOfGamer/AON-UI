import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import Tooltip from './Tooltip'
import styles from './Buff.scss'

class Buff extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }
  render() {
    const { intl, unrealapi, BuffName, BuffTips } = this.props

    return (
      <div className={[styles['buff-group'], Buff.length === 0 ? styles.disable : ''].join(' ')}>
        <div className={styles['buff-list']}>
          {
            this.props.Buff.map((path, index) => {
              return (
                <div key={`buff-${index}`}>
                  <img
                    className={styles.buff}
                    src={path}
                    data-tip
                    data-for={`bufftip${index}`}
                  />
                  <Tooltip id={`bufftip${index}`} tooltip={BuffTips[index]} />
                </div>
              )
            })
          }
        </div>
      </div >
    )
  }
}

Buff.propTypes = {}

function mapStateToProps(state) {
  return {
    unrealapi: state.player.unrealapi,
    Buff: state.player.Buff,
    BuffTips: state.player.BuffTips,
  }
}

export default connect(mapStateToProps)(injectIntl(Buff))
