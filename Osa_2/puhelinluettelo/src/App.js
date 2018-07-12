import React from 'react';

const Contact = ({ name }) => <p>{name}</p>

const Contacts = ({ persons }) => persons.map(
	person => <Contact key={person.name} name={person.name} />
)

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [
				{ name: 'Arto Hellas' }
			],
			newName: ''
		}
	}

	addContact = (event) => {
		event.preventDefault()

		const newPerson = {
			name: this.state.newName
		}

		const persons = this.state.persons.concat(newPerson)

		this.setState({
			persons,
			newName: ''
		})
	}

	handleContactFieldChange = (event) => {
		this.setState({ newName: event.target.value })
	}

	render() {
		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<form onSubmit={this.addContact}>
					<div>
						nimi: <input
							value={this.state.newName}
							onChange={this.handleContactFieldChange}
						/>
					</div>
					<div>
						<button type="submit">lisää</button>
					</div>
				</form>
				<h2>Numerot</h2>
				<div>
					<Contacts persons={this.state.persons} />
				</div>
			</div>
		)
	}
}

export default App