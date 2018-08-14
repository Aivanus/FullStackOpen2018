const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const old = state.filter(a => a.id !== action.id)
      const voted = state.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    }
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export const voting = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export default reducer