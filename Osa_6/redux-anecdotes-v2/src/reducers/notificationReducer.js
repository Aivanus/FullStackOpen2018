const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      console.log('set')
      return action.notification
    case 'CLEAR':
      console.log('clear')
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