const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.notification
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET',
    notification: notification
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default reducer