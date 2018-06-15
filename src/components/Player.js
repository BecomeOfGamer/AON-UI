import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './Player.scss'
import HeroCharacter from '../interface/HeroCharacter'

class Player extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }
  render() {
    const { intl, Hero } = this.props
    let hero = new HeroCharacter()
    hero = Hero
    return (
      <div id="player" className={styles['player-group']}>
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
              <th>{intl.formatMessage({ id: 'intl.player.CurrentMP' })}</th>
              <td>{this.props.CurrentMP}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentAttackSpeed' })}</th>
              <td>{this.props.CurrentAttackSpeed}</td>
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
        <table className={styles['table-hero']}>
          <tbody>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.Strength' })}</th>
              <td>{hero.Strength}({hero.AdditionStrength})</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.Agility' })}</th>
              <td>{hero.Agility}({hero.AdditionAgility})</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.Intelligence' })}</th>
              <td>{hero.Intelligence}({hero.AdditionIntelligence})</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentLevel' })}</th>
              <td>{hero.CurrentLevel}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.CurrentEXP' })}</th>
              <td>{hero.CurrentEXP}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.BountyEXP' })}</th>
              <td>{hero.BountyEXP}</td>
            </tr>
            <tr>
              <th>{intl.formatMessage({ id: 'intl.player.DeadTime' })}</th>
              <td>{hero.DeadTime}</td>
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
    CurrentMP: state.player.CurrentMP,
    CurrentAttackSpeed: state.player.CurrentAttackSpeed,
    CurrentAttack: state.player.CurrentAttack,
    CurrentArmor: state.player.CurrentArmor,
    CurrentAttackRange: state.player.CurrentAttackRange,
    Hero: state.player.Hero,
  }
}

export default connect(mapStateToProps)(injectIntl(Player))
