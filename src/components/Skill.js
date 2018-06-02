import React from 'react'
import { connect } from 'dva'
import { injectIntl, FormattedMessage } from 'react-intl'
import styles from './Skill.scss'

class Skill extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.dispatch = props.dispatch
    this.state = {}
  }
  render() {
    const { intl, api } = this.props
    return (
      <div className={styles['skill-group']}>
        {this.props.Skill.map((path, index) => (
          <img
            key={`skillupimg${index}`}
            className={styles.skill}
            src={path}
            alt=""
            onClick={() => this.dispatch({ type: 'player/skillLevelUp', payload: { 'api': api } })}
          />
        ))}
      </div>
    )
  }
}

Skill.propTypes = {}

function mapStateToProps(state) {
  return {
    Skill: state.player.Skill,
  }
}

export default connect(mapStateToProps)(injectIntl(Skill))
