import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './IndexPage.scss'

import Language from '../components/Language'
import Player from '../components/Player'
import Skill from '../components/Skill'
import Buff from '../components/Buff'

let RectTimer = null

class IndexPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.update = this.update.bind(this)
  }

  componentWillMount() {
    // 連線至 UE4
    this.dispatch({ type: 'status/connectAPI', payload: { dispatch: this.dispatch } })
  }

  componentDidMount() {
    // 每秒偵測面板可觸區域
    RectTimer = setInterval(this.update, 1000)
  }

  componentWillUnmount() {
    clearInterval(RectTimer)
  }

  /**
   * 設定面板可觸區域
   */
  update() {
    const elements = []
    if (this.props.PanelVisible) {
      // element.getBoundingClientRect() -> 在 UE4 中, 此 JS 涵式失效, 請勿使用
      elements.push({ id: 'skill', property: document.querySelector('#skill') })    // 技能資訊面板
      elements.push({ id: 'player', property: document.querySelector('#player') })  // 玩家狀態面板
    }
    this.dispatch({ type: 'status/rect', payload: { URAPI: this.props.URAPI, elements: elements } })
  }

  render() {
    const { PanelVisible } = this.props
    return (
      <div className={styles.app}>
        <Language />
        {/* 待考量效能問題 是否改使用 display or visibility */}
        {PanelVisible ? <Player /> : null}
        {PanelVisible ? <Buff /> : null}
        {PanelVisible ? <Skill /> : null}
        {/* 待考量效能問題 是否改使用 display or visibility */}
      </div>
    );
  }
}

IndexPage.propTypes = {}

function mapStateToProps(state) {
  return {
    URAPI: state.status.URAPI,
    Elements: state.status.Elements,
    PanelVisible: state.status.PanelVisible,
  }
}

export default connect(mapStateToProps)(injectIntl(IndexPage))
