import React from 'react'
import styles from './Example.scss'

// const Example = () => {
//   return (
//     <div className={styles.example}>
//       Example
//     </div>
//   );
// };

class Example extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
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
