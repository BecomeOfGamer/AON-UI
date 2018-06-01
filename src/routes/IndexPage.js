import React from 'react'
import { connect } from 'dva'
import styles from './IndexPage.scss'

import Example from '../components/Example'

// Old
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
  }

  render() {
    const props = this.props
    return (
      <div>
        <Example />
        <h2>{props.count}</h2>
        <button type="button" className={styles.btn}
          onClick={() => { this.dispatch({ type: 'example/add', payload: { count: 2 } }) }}>+</button>
        <button type="button" className={styles.btn}
          onClick={() => { this.dispatch({ type: 'example/minus' }) }}>-</button>
      </div>
    );
  }
}

IndexPage.propTypes = {
}

function mapStateToProps(state) {
  return {
    count: state.example.count,
  }
}

export default connect(mapStateToProps)(IndexPage)
