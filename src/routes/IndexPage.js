import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './IndexPage.scss'

import Language from '../components/Language'
import Player from '../components/Player'
import Skill from '../components/Skill'
import Buff from '../components/Buff'

class IndexPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.dispatch({ type: 'player/connectAPI', payload: { dispatch: this.dispatch } })
  }

  render() {
    const { progress, fps } = this.props

    return (
      <div className={styles.app}>
        <div className={styles.info}>
          <div>Loading: {progress}</div>
          <div>Fps: {fps}</div>
        </div>
        <Language />
        <Player />
        <Buff />
        <Skill />
      </div>
    );
  }
}

IndexPage.propTypes = {}

function mapStateToProps(state) {
  return {
    progress: state.status.progress,
    fps: state.status.fps,
  }
}

export default connect(mapStateToProps)(injectIntl(IndexPage))
