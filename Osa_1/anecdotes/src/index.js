import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>Votes: {votes}</p>
  </div>
)

const TopAnecdote = ({ anecdotes, votes }) => {
  const i = votes.indexOf(Math.max(...votes));
  return (
    <div>
      <h2>Anecdote with most votes:</h2>
      <Anecdote text={anecdotes[i]} votes={votes[i]} />
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

  clickNext = () => {
    let next = Math.floor(Math.random() * this.props.anecdotes.length)
    while (next === this.state.selected) {
      next = Math.floor(Math.random() * this.props.anecdotes.length)
    }
    return () => {
      this.setState({ selected: next })
    }
  }

  clickVote = () => {
    const copy = [...this.state.votes]
    copy[this.state.selected] += 1
    return () => {
      this.setState({ votes: copy })
    }
  }

  render() {
    console.log("Selected", this.state.selected)
    console.log(this.state.votes)
    return (
      <div>
        <Anecdote text={this.props.anecdotes[this.state.selected]} votes={this.state.votes[this.state.selected]} />
        <Button handleClick={this.clickVote()} text="Vote" />
        <Button handleClick={this.clickNext()} text="Next anecdote" />
        <TopAnecdote anecdotes={this.props.anecdotes} votes={this.state.votes} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)