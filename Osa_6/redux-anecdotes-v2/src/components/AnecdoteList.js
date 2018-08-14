import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { voting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={async () => {
                this.props.voting(anecdote)
                this.props.notify(`You voted ${anecdote.content}!`,5)
              }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (filter, anecdotes) => {
  if (filter === '') {
    return anecdotes
  }

  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.filter, state.anecdotes).sort((a, b) => b.votes - a.votes)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  {
    voting,
    notify
  }
)(AnecdoteList)

export default ConnectedAnecdoteList
