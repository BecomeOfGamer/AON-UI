import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './Player.scss'

class Player extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }
  render() {
    const { intl } = this.props
    return (
      <div className={styles['player-group']}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.UnitName' })}</th>
              <td>{this.props.UnitName}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentMoveSpeed' })}</th>
              <td>{this.props.CurrentMoveSpeed}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentHP' })}</th>
              <td>{this.props.CurrentHP}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentAttackSpeed' })}</th>
              <td>{this.props.CurrentAttackSpeed}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentLevel' })}</th>
              <td>{this.props.CurrentLevel}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentAttack' })}</th>
              <td>{this.props.CurrentAttack}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentArmor' })}</th>
              <td>{this.props.CurrentArmor}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentAttackRange' })}</th>
              <td>{this.props.CurrentAttackRange}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

Player.propTypes = {}

function mapStateToProps(state) {
  return {
    UnitName: state.player.UnitName,
    CurrentMoveSpeed: state.player.CurrentMoveSpeed,
    CurrentHP: state.player.CurrentHP,
    CurrentAttackSpeed: state.player.CurrentAttackSpeed,
    CurrentLevel: state.player.CurrentLevel,
    CurrentAttack: state.player.CurrentAttack,
    CurrentArmor: state.player.CurrentArmor,
    CurrentAttackRange: state.player.CurrentAttackRange,
  }
}

export default connect(mapStateToProps)(injectIntl(Player))
