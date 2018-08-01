import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './PlayerLife.scss'

class PlayerLife extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  /**
   * 計算當前血量或魔力比例
   * @param {Number} now
   * @param {Number} all
   */
  percentCaculate(now, all) {
    return `${Number.parseFloat(now / all * 100).toFixed(2)}%`
  }

  render() {
    const { intl, CurrentMaxHP, CurrentMaxMP, CurrentHP, CurrentMP } = this.props

    return (
      <div>
        <div className={styles.progress}>
          <div className={styles['progress-text']}>{CurrentHP} / {CurrentMaxHP}</div>
          <div
            className={[styles['progress-bar'], styles['progress-bar-danger'], styles['progress-bar-under']].join(' ')}
            style={{ 'width': `${this.percentCaculate(CurrentHP, CurrentMaxHP)}` }}
          >
          </div>
          <div
            className={[styles['progress-bar'], styles['progress-bar-success']].join(' ')}
            style={{ 'width': `${this.percentCaculate(CurrentHP, CurrentMaxHP)}` }}
          >
          </div>
        </div>
        <div className={styles.progress}>
          <div className={styles['progress-text']}>{CurrentMP} / {CurrentMaxMP}</div>
          <div
            className={[styles['progress-bar'], styles['progress-bar-info'], styles['progress-bar-under']].join(' ')}
            style={{ 'width': `${this.percentCaculate(CurrentMP, CurrentMaxMP)}` }}
          >
          </div>
          <div className={styles['progress-bar']} style={{ 'width': `${this.percentCaculate(CurrentMP, CurrentMaxMP)}` }}></div>
        </div>
      </div>
    )
  }
}

PlayerLife.propTypes = {}

function mapStateToProps(state) {
  return {
    CurrentMaxHP: state.player.CurrentMaxHP,
    CurrentMaxMP: state.player.CurrentMaxMP,
    CurrentHP: state.player.CurrentHP,
    CurrentMP: state.player.CurrentMP,
  }
}

export default connect(mapStateToProps)(injectIntl(PlayerLife))
