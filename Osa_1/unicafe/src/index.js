import React from 'react';
import ReactDOM from 'react-dom';

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

  let tot = state.hyva + state.neutraali + state.huono
  if (tot === 0) {
    return (
      <div>
        <p> Paulautetta ei ole annettu </p>
      </div>
    )
  }

  const mean = () => {
    let temp = (state.hyva - state.huono) / tot
    return (
      temp.toFixed(2)
    )
  }

  const positive = () => ((state.hyva / tot) * 100).toFixed(2)
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Hyvä" value={state.hyva} />
          <Statistic text="Neutraali" value={state.neutraali} />
          <Statistic text="Huono" value={state.huono} />
          <Statistic text="Keskiarvo" value={mean()} />
          <Statistic text="Positiivisia" value={positive()+" %"} />
        </tbody>
      </table>
      {/* <p>Keskiarvo {mean()}</p>
      <p>Positiivisia {positive()}%</p> */}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  clickIncrement = (field) => {
    return () => {
      this.setState({ [field]: this.state[field] + 1 })
    }
  }

  render() {
    return (
      <div>
        <Header header="Anna palautetta" />
        <Button handleClick={this.clickIncrement("hyva")} text="Hyvä" />
        <Button handleClick={this.clickIncrement("neutraali")} text="Neutraali" />
        <Button handleClick={this.clickIncrement("huono")} text="Huono" />
        <Header header="Statistiikka" />
        <Statistics state={this.state} />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));