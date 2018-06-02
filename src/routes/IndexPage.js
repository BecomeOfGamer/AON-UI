import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './IndexPage.scss'

import UnrealAPI from '../api/UnrealAPI'

import Example from '../components/Example'
import Player from '../components/Player'

// Old - not good
// function IndexPage(props, context) {
//   const dispatch = props.dispatch
//   return (
//     <div>
//       <Example />
//       <h2>{props.count}</h2>
//       <button type="button" className={styles.btn}
//         onClick={() => { dispatch({ type: 'example/add', payload: { count: 2 } }) }}>+</button>
//       <button type="button" className={styles.btn}
//         onClick={() => { dispatch({ type: 'example/minus' }) }}>-</button>
//     </div>
//   )
// }

class IndexPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {
      name: 'Robby',
    }
    this.unrealapi = new UnrealAPI(this.dispatch)
  }

  render() {
    const { intl } = this.props

    // 渲染方法 1 - http://www.cnblogs.com/qiaojie/p/6411199.html
    const helloFormat = intl.formatMessage({ id: 'intl.hello' })
    const nameFormat = intl.formatMessage({ id: 'intl.name' }, { name: this.state.name })
    // 渲染方法 2
    // <FormattedMessage />

    return (
      <div>
        {/* <Example /> */}
        <h1>{this.props.count}</h1>
        <p>方法1-
          <FormattedMessage
            id="intl.hello"
            defaultMessage={'hello'}
          />,&nbsp;
          <FormattedMessage
            id="intl.name"
            defaultMessage={'預設內容'}
            values={{ name: this.state.name }}
          />.
        </p>
        <p>方法2-{helloFormat},&nbsp;{nameFormat}.</p>
        <button
          type="button"
          className={styles.btn}
          onClick={() => { this.dispatch({ type: 'example/add', payload: { count: 2 } }) }}
        >+
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={() => { this.dispatch({ type: 'example/minus' }) }}
        >-
        </button>
        <Player />
      </div>
    );
  }
}

IndexPage.propTypes = {}

function mapStateToProps(state) {
  return {
    count: state.example.count,
  }
}

export default connect(mapStateToProps)(injectIntl(IndexPage))
