import React from 'react'
// import notificationReducer from '../reducers/notificationReducer'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (this.props.store.getState().notification ?
      (<div style={style}>
        {this.props.store.getState().notification}
      </div>) : null
    )
  }
}

export default Notification
