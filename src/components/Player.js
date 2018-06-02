import React from 'react'
import { connect } from 'dva'
import styles from './Player.scss'

class Player extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }
  render() {
    return (
      <div className={styles.player}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>HeroName</td>
              <td>{this.props.HeroName}</td>
            </tr>
            <tr>
              <td>CurrentMoveSpeed</td>
              <td>{this.props.CurrentMoveSpeed}</td>
            </tr>
            <tr>
              <td>CurrentHP</td>
              <td>{this.props.CurrentHP}</td>
            </tr>
            <tr>
              <td>CurrentAttackSpeed</td>
              <td>{this.props.CurrentAttackSpeed}</td>
            </tr>
            <tr>
              <td>CurrentLevel</td>
              <td>{this.props.CurrentLevel}</td>
            </tr>
            <tr>
              <td>CurrentAttack</td>
              <td>{this.props.CurrentAttack}</td>
            </tr>
            <tr>
              <td>CurrentArmor</td>
              <td>{this.props.CurrentArmor}</td>
            </tr>
            <tr>
              <td>CurrentAttackRange</td>
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
    HeroName: state.player.HeroName,
    CurrentMoveSpeed: state.player.CurrentMoveSpeed,
    CurrentHP: state.player.CurrentHP,
    CurrentAttackSpeed: state.player.CurrentAttackSpeed,
    CurrentLevel: state.player.CurrentLevel,
    CurrentAttack: state.player.CurrentAttack,
    CurrentArmor: state.player.CurrentArmor,
    CurrentAttackRange: state.player.CurrentAttackRange,
  }
}

export default connect(mapStateToProps)(Player)
