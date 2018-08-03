import React from 'react'
import { connect } from 'dva'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

addLocaleData([...en, ...zh])

class HotSwappingIntlProvider extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { locale, key, messages, children } = this.props
    return (
      <IntlProvider
        locale={locale}
        key={key}
        messages={messages}
      >
        {children}
      </IntlProvider>
    )
  }
}

HotSwappingIntlProvider.propTypes = {}

function mapStateToProps(state) {
  return {
    locale: state.language.locale,
    key: state.language.key,
    messages: state.language.messages,
  }
}

export default connect(mapStateToProps)(HotSwappingIntlProvider)
