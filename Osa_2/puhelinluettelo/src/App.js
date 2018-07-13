import React from 'react';
import Contacts from './components/Contacts'
import NewContact from './components/NewContact'


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [
				{
					name: 'Arto Hellas',
					number: '040-12345'
				},
				{
					name: 'General Kenobi',
					number: '040-456123'
				},
				{
					name: 'Padavan Kenobi',
					number: '040-456123'
				}
			],
			newName: '',
			newNumber: '',
			filter: ''
		}
	}

	addContact = (event) => {
		event.preventDefault()

		const newPerson = {
			name: this.state.newName,
			number: this.state.newNumber
		}

		const persons =
			this.state.persons.some(person => person.name === newPerson.name) ?
				this.state.persons :
				this.state.persons.concat(newPerson)


		this.setState({
			persons,
			newName: '',
			newNumber: ''
		})
	}

	handleNameFieldChange = (event) => {
		this.setState({ newName: event.target.value })
	}

	handleNumberFieldChange = (event) => {
		this.setState({ newNumber: event.target.value })
	}

	handleFilterChange = (event) => {
		this.setState({ filter: event.target.value })
	}

	render() {
		const contactsToShow =
			this.state.filter === "" ?
				this.state.persons :
				this.state.persons.filter(
					person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase())
				)

		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<div>
					Rajaa näytettäviä: <input
						value={this.state.filter}
						onChange={this.handleFilterChange}
					/>
				</div>
				<h3>Lisää uusi</h3>
				<NewContact
					state={this.state}
					handleSubmit={this.addContact}
					handleChangeName={this.handleNameFieldChange}
					handleChangeNumber={this.handleNumberFieldChange}
				/>
				<div>
					<h2>Numerot</h2>
					<Contacts persons={contactsToShow} />
				</div>
			</div>
		)
	}
}

export default App