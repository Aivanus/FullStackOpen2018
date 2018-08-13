import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleClick = (anecdote) => () => {
    this.props.store.dispatch(voting(anecdote.id))
    this.props.store.dispatch(
      setNotification(`You voted ${anecdote.content}!`)
    )

    setTimeout(() => this.props.store.dispatch(
      clearNotification()
    ), 5000)
  }

  render() {
    const anecdotesToShow = () => {
      const { anecdotes, filter } = this.props.store.getState()
      if (filter === '') {
        return anecdotes
      }

      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }

    const anecdotes = anecdotesToShow()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleClick(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
