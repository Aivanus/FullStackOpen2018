import React from 'react'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

class Notification extends React.Component {
  render() {
    if (this.props.notification) {
      setTimeout(() => {
        this.props.clearNotification()
      }, 5000)
    }
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (this.props.notification ?
      (<div style={style}>
        {this.props.notification}
      </div>) : null
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps,
  {
    setNotification,
    clearNotification
  }
)(Notification)

export default ConnectedNotification
