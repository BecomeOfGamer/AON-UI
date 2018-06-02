import React from 'react'
import { connect } from 'dva'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import zhTW from '../locale/zh-TW'
import enUS from '../locale/en-US'

addLocaleData([...en, ...zh])

class HotSwappingIntlProvider extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {
      locale: 'en',
      key: 'en',
      messages: enUS,
    }
  }

  render() {
    // dispatch for testing
    this.dispatch({ type: 'locale/update', payload: this.state })
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.ket}
        messages={this.props.messages}
      >
        {this.props.children}
      </IntlProvider>
    )
  }
}

HotSwappingIntlProvider.propTypes = {}

function mapStateToProps(state) {
  return {
    locale: state.locale.locale,
    key: state.locale.key,
    messages: state.locale.messages,
  }
}

export default connect(mapStateToProps)(HotSwappingIntlProvider)
