import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import Tooltip from './Tooltip'
import styles from './Buff.scss'

import InterBuff from '../interface/Buff'

class Buff extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }

  render() {
    const { intl, Buffs } = this.props
    return (
      <div className={[styles['buff-group'], Buffs.length === 0 ? styles.disable : ''].join(' ')}>
        <div className={styles['buff-list']}>
          {
            Buffs.map((buff, index) => {
              let bf = new InterBuff()
              bf = buff
              return (
                <div key={`buff-${index}`}>
                  <div
                    className={styles.buff}
                    style={{ 'backgroundImage': `url(${bf.Webpath})` }}
                    data-tip
                    data-for={`bufftip${index}`}
                  >
                  </div>
                  <Tooltip id={`bufftip${index}`} tooltip={bf.Tips} />
                </div>
              )
            })
          }
        </div>
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
