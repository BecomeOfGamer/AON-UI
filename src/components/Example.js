import React from 'react'
import styles from './Example.scss'

class Example extends React.Component {
  render() {
    return (
      <div className={styles.example}>
        Example
      </div>
    )
  }
}

Example.propTypes = {
}

export default Example
