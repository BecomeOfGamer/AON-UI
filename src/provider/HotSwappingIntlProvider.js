import React from 'react'
import { connect } from 'dva'
import { IntlProvider, addLocaleData } from 'react-intl'

// Import i18n here
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

addLocaleData([...en, ...zh])

class HotSwappingIntlProvider extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { locale, messages, children } = this.props
    return (
      <IntlProvider
        key={'intl'}
        locale={locale}
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
