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
          </tbody>
        </table>
      </div>
    )
  }
}

Player.propTypes = {
}

function mapStateToProps(state) {
  return {
    HeroName: state.player.HeroName,
    CurrentMoveSpeed: state.player.CurrentMoveSpeed,
    CurrentHP: state.player.CurrentHP,
  }
}

export default connect(mapStateToProps)(Player)
