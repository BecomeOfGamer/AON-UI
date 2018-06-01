import React from 'react'
import { connect } from 'dva'
import styles from './IndexPage.scss'

import Example from '../components/Example'

import UnrealAPI from '../lib/UnrealAPI'

let unrealapi

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
    unrealapi = new UnrealAPI(this.dispatch)
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
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>HeroName</td>
              <td>{props.HeroName}</td>
            </tr>
            <tr>
              <td>CurrentMoveSpeed</td>
              <td>{props.CurrentMoveSpeed}</td>
            </tr>
            <tr>
              <td>CurrentHP</td>
              <td>{props.CurrentHP}</td>
            </tr></tbody>
        </table>
      </div>
    );
  }
}

IndexPage.propTypes = {
}

function mapStateToProps(state) {
  return {
    count: state.example.count,
    HeroName: state.example.HeroName,
    CurrentMoveSpeed: state.example.CurrentMoveSpeed,
    CurrentHP: state.example.CurrentHP,
  }
}

export default connect(mapStateToProps)(IndexPage)
