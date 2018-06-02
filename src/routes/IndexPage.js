import React from 'react'
import { connect } from 'dva'
import styles from './IndexPage.scss'

import UnrealAPI from '../lib/UnrealAPI'

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
    this.state = {}
    this.unrealapi = new UnrealAPI(this.dispatch)
  }

  render() {
    return (
      <div>
        {/* <Example /> */}
        <h2>{this.props.count}</h2>
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

export default connect(mapStateToProps)(IndexPage)
