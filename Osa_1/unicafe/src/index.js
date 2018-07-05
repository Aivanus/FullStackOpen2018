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
    <div>
      <p>{text} {value}</p>
    </div>
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

  const positive = () => ((state.hyva/tot)*100).toFixed(2)
  return (
    <div>
      <Statistic text="Hyvä" value={state.hyva} />
      <Statistic text="Neutraali" value={state.neutraali} />
      <Statistic text="Huono" value={state.huono} />
      <p>Keskiarvo {mean()}</p>
      <p>Positiivisia {positive()}%</p>
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

  clickHyva = () => this.setState({ hyva: this.state.hyva + 1 })
  clickNeutraali = () => this.setState({ neutraali: this.state.neutraali + 1 })
  clickHuono = () => this.setState({ huono: this.state.huono + 1 })

  render() {
    return (
      <div>
        <Header header="Anna palautetta" />
        <Button handleClick={this.clickHyva} text="Hyvä" />
        <Button handleClick={this.clickNeutraali} text="Neutraali" />
        <Button handleClick={this.clickHuono} text="Huono" />
        <Header header="Statistiikka" />
        <Statistics state={this.state} />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));