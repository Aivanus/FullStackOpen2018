const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SETFILTER':
      return action.filter
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SETFILTER',
    filter: filter
  }
}

export default reducer