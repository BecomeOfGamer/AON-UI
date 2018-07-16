import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './Buff.scss'
import BuffCD from './BuffCD'

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
        {
          Buffs.map((buf, index) => {
            return (
              <BuffCD
                key={`buff-group-${index}`}
                index={index}
              />
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
