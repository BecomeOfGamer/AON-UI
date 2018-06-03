import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './IndexPage.scss'

import UnrealAPI from '../api/UnrealAPI'

import Player from '../components/Player'
import Skill from '../components/Skill'

import zhTW from '../locale/zh-TW'
import enUS from '../locale/en-US'

class IndexPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    const { locale, UnitName } = props
    this.state = {
      unitname: UnitName,
      'locale': locale,
    }
    this.unrealapi = new UnrealAPI(this.dispatch)
    this.unrealapi.emit('skillupimg1', {})
  }

  /**
   * Change Locale
   * @param {String} locale [en, zh]
   */
  changeLocale(locale) {
    switch (locale) {
      case 'en':
        this.dispatch({ type: 'language/update', payload: { locale: 'en', key: 'en', messages: enUS } })
        break;
      case 'zh':
        this.dispatch({ type: 'language/update', payload: { locale: 'zh', key: 'zh', messages: zhTW } })
        break;
      default:
        this.dispatch({ type: 'language/update', payload: { locale: 'zh', key: 'zh', messages: zhTW } })
        break;
    }
    this.setState({ 'locale': locale })
  }

  render() {
    const { intl } = this.props

    // 渲染方法 1 - http://www.cnblogs.com/qiaojie/p/6411199.html
    const helloFormat = intl.formatMessage({ id: 'intl.hello' })
    const nameFormat = intl.formatMessage({ id: 'intl.name' }, { name: this.state.unitname })
    // 渲染方法 2
    // <FormattedMessage />

    return (
      <div>
        <a
          className={[styles.lang, this.state.locale === 'en' ? styles.select : null].join(' ')}
          href="#"
          onClick={() => this.changeLocale('en')}
        >英文
        </a>
        <a
          className={[styles.lang, this.state.locale === 'zh' ? styles.select : null].join(' ')}
          href="#"
          onClick={() => this.changeLocale('zh')}
        >中文
        </a>
        <p>語系渲染方法 1 -
          <FormattedMessage
            id="intl.hello"
            defaultMessage={'hello'}
          />,&nbsp;
          <FormattedMessage
            id="intl.name"
            defaultMessage={'預設內容'}
            values={{ name: this.state.unitname }}
          />.
        </p>
        <p>語系渲染方法 2 -{helloFormat},&nbsp;{nameFormat}.</p>
        <Player />
        <Skill api={this.unrealapi} />
      </div>
    );
  }
}

IndexPage.propTypes = {}

function mapStateToProps(state) {
  return {
    UnitName: state.player.UnitName,
    locale: state.language.locale,
    key: state.language.key,
    messages: state.language.messages,
  }
}

export default connect(mapStateToProps)(injectIntl(IndexPage))
