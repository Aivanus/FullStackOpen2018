import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import counterReducer from './reducer'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ state }) => {

  let tot = store.getState().good + store.getState().ok + store.getState().bad
  if (tot === 0) {
    return (
      <div>
        <p> Paulautetta ei ole annettu </p>
      </div>
    )
  }

  const mean = () => {
    let temp = (store.getState().good - store.getState().bad) / tot
    return (
      temp.toFixed(2)
    )
  }

  const positive = () => ((store.getState().good / tot) * 100).toFixed(2)
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Hyvä" value={store.getState().good} />
          <Statistic text="Neutraali" value={store.getState().ok} />
          <Statistic text="Huono" value={store.getState().bad} />
          <Statistic text="Keskiarvo" value={mean()} />
          <Statistic text="Positiivisia" value={positive()+" %"} />
        </tbody>
      </table>
    </div>
  )
}

const store = createStore(counterReducer)

class App extends React.Component {

  clickIncrement = (field) => {
    return () => {
      store.dispatch({type: field})
    }
  }

  render() {
    return (
      <div>
        <Header header="Anna palautetta" />
        <Button handleClick={this.clickIncrement("GOOD")} text="Hyvä" />
        <Button handleClick={this.clickIncrement("OK")} text="Neutraali" />
        <Button handleClick={this.clickIncrement("BAD")} text="Huono" />
        <Header header="Statistiikka" />
        <Statistics state={this.state} />
        <Button handleClick={this.clickIncrement("ZERO")} text="Nollaa tilasto" />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)