import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './IndexPage.scss'

import Language from '../components/Language'
import Player from '../components/Player'
import Skill from '../components/Skill'

class IndexPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.dispatch({ type: 'player/connectAPI', payload: { dispatch: this.dispatch } })
  }

  render() {
    const { progress, fps } = this.props

    return (
      <div>
        <p>Loading: {progress}</p>
        <p>Fps: {fps}</p>
        <Language />
        <Player />
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
