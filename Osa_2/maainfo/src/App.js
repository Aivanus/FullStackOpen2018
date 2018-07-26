import React, { Component } from 'react';
import axios from 'axios'

class CountryList extends React.Component {
  render() {
    const { filter, countries, updateParent } = this.props
    if (countries === null) {
      return null
    }

    const filtered = countries.filter(
      c => c.name.toLowerCase().startsWith(filter.toLowerCase())
    )

    if (filtered.length > 10) {
      return (
        <p> Too many results, please be more specific </p>
      )
    }

    if (filtered.length === 1) {
      const focused = filtered[0]
      return (
        <div>
          <h1>{focused.name}</h1>
          <p>Capital: {focused.capital}</p>
          <p>Population: {focused.population}</p>
          <img src={focused.flag} alt={focused.name + " flag"} style={{ width: 300, height: 150 }} />
        </div>
      )
    }

    return (
      <ul>
        {filtered.map(c =>
          <li key={c.alpha3Code}>
            <div onClick={updateParent(c.name)}>
              {c.name}
            </div>
          </li>)
        }
      </ul>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    console.log('mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleSearchChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  updateFilterFromChild = (value) => {
    return () => this.setState({ filter: value })
  }

  render() {
    return (
      <div>
        Find countries: <input value={this.filter} onChange={this.handleSearchChange} />
        <CountryList filter={this.state.filter} countries={this.state.countries} updateParent={this.updateFilterFromChild}/>
      </div>
    )
  }
}

export default App;
