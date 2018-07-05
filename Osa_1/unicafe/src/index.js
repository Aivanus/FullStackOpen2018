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

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    mean = () => {
        let tot = this.state.hyva + this.state.neutraali + this.state.huono
        if (tot === 0) {
            return (0)
        }
        let temp = (this.state.hyva - this.state.huono) / tot
        temp = temp * 100
        return (
            temp.toFixed(2)
        )
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
                <p>Hyvä {this.state.hyva}</p>
                <p>Neutraali {this.state.neutraali}</p>
                <p>Huono {this.state.huono}</p>
                <p>Keskiarvo {this.mean()}%</p>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));