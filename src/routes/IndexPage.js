import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './IndexPage.scss'

import Language from '../components/Language'
import Player from '../components/Player'
import Skill from '../components/Skill'
import Buff from '../components/Buff'

import Element from '../interface/Element'

class IndexPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
  }

  componentWillMount() {
    this.dispatch({ type: 'status/connectAPI', payload: { dispatch: this.dispatch } })
  }

  componentDidMount() {

    // 設定 UE4 可觸及區域
    const elements = []

    // 技能資訊面板
    elements.push({ id: 'skill', rect: document.querySelector('#skill').getBoundingClientRect() })
    // 玩家狀態面板
    elements.push({ id: 'player', rect: document.querySelector('#player').getBoundingClientRect() })

    this.dispatch({ type: 'status/rect', payload: { URAPI: this.props.URAPI, elements: elements } })
  }

  render() {
    const { progress, fps } = this.props

    return (
      <div className={styles.app}>
        <div className={styles.info}>
          <div>Loading: {progress}</div>
          <div>Fps: {fps}</div>
        </div>
        {this.props.Elements}
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
    fps: state.status.fps,
    progress: state.status.progress,
    URAPI: state.status.URAPI,
    Elements: state.status.Elements,
  }
}

export default connect(mapStateToProps)(injectIntl(IndexPage))
